FROM node:24-alpine AS runtime
ENV NODE_ENV=production PORT=8080
WORKDIR /app
RUN addgroup -S -g 10001 app && adduser -S -u 10001 -G app app
COPY --chown=app:app package.json server.js ./
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD node -e "fetch('http://127.0.0.1:8080/livez').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
