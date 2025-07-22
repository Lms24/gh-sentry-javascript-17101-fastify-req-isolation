import fastify from "fastify";
import { getTraceData, setupFastifyErrorHandler } from "@sentry/node";
import { getCurrentScope } from "@sentry/node";

const app = fastify();

setupFastifyErrorHandler(app);

app.get("/test-trace", (request, reply) => {
  reply.send(
    `${getCurrentScope().getPropagationContext().traceId} | ${JSON.stringify(
      getTraceData()
    )}`
  );
});

const address = await app.listen({
  host: "::",
  port: 3000,
});
