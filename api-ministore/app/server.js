const http = require('node:http');

function handleRequest(req, res, { version = process.env.APP_VERSION || '1.0.0', ready, shuttingDown }) {
  res.setHeader('content-type', 'application/json');
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('cache-control', 'no-store');
  if (req.method === 'GET' && req.url === '/livez') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'alive' }));
  }
  if (req.method === 'GET' && req.url === '/readyz') {
    const healthy = ready && !shuttingDown;
    res.writeHead(healthy ? 200 : 503);
    return res.end(JSON.stringify({ status: healthy ? 'ready' : 'not-ready' }));
  }
  if (req.method === 'GET' && req.url === '/api/v1/status') {
    res.writeHead(200);
    return res.end(JSON.stringify({ service: 'ministore-api', version, status: 'ok' }));
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'not found' }));
}

function createServer({ version = process.env.APP_VERSION || '1.0.0' } = {}) {
  let ready = false;
  let shuttingDown = false;
  const server = http.createServer((req, res) => handleRequest(req, res, { version, ready, shuttingDown }));
  server.requestTimeout = 10_000;
  server.headersTimeout = 12_000;
  server.keepAliveTimeout = 5_000;
  server.once('listening', () => { ready = true; });
  server.once('close', () => { ready = false; });
  return {
    server,
    shutdown() { shuttingDown = true; server.close(); },
  };
}

if (require.main === module) {
  const port = Number(process.env.PORT || 8080);
  const { server, shutdown } = createServer();
  server.listen(port, '0.0.0.0', () => {
    process.stdout.write(JSON.stringify({ level: 'info', event: 'started', port }) + '\n');
  });
  for (const signal of ['SIGTERM', 'SIGINT']) {
    process.once(signal, () => {
      process.stdout.write(JSON.stringify({ level: 'info', event: 'shutdown', signal }) + '\n');
      shutdown();
      const forceExit = setTimeout(() => process.exit(1), 25_000);
      forceExit.unref();
      server.once('close', () => { clearTimeout(forceExit); process.exit(0); });
    });
  }
}

module.exports = { createServer, handleRequest };
