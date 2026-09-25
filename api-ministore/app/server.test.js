const assert = require('node:assert/strict');
const { test } = require('node:test');
const { handleRequest } = require('./server');

function invoke(path, options = {}, method = 'GET') {
  const response = {
    headers: {},
    status: undefined,
    body: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    writeHead(status) { this.status = status; },
    end(body) { this.body = body; },
  };
  handleRequest({ method, url: path }, response, { ready: true, shuttingDown: false, ...options });
  return response;
}

test('liveness and readiness routes report service health', () => {
  assert.equal(invoke('/livez').status, 200);
  assert.equal(invoke('/readyz').status, 200);
  assert.equal(invoke('/readyz', { shuttingDown: true }).status, 503);
});

test('status route returns configured service metadata', () => {
  const response = invoke('/api/v1/status', { version: 'test-version' });
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(response.body), {
    service: 'ministore-api',
    version: 'test-version',
    status: 'ok',
  });
  assert.equal(response.headers['x-content-type-options'], 'nosniff');
});

test('unknown routes and methods return JSON 404 responses', () => {
  const missing = invoke('/missing');
  const unsupportedMethod = invoke('/api/v1/status', {}, 'POST');
  for (const response of [missing, unsupportedMethod]) {
    assert.equal(response.status, 404);
    assert.deepEqual(JSON.parse(response.body), { error: 'not found' });
  }
});
