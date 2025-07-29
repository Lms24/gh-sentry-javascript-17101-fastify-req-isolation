import fastify from "fastify";
import { getTraceData, setupFastifyErrorHandler } from "@sentry/node";
import { getCurrentScope } from "@sentry/node";

const app = fastify();

// setupFastifyErrorHandler(app);

app.get("/test-trace", (request, reply) => {
  reply.send(
    `${getCurrentScope().getPropagationContext().traceId} | ${JSON.stringify(
      getTraceData()
    )}`
  );
});

app.get("/test-error", (request, reply) => {
  throw new Error("test error");
});

app.get("/test-ignore-error", (request, reply) => {
  throw Response.json(
    {
      error: {
        code: 400,
        details: "test ignore error",
        id: "some id",
        message: "some message",
      },
    },
    {
      headers: {},
      status: 400,
    }
  );
});

const address = await app.listen({
  host: "::",
  port: 3000,
});

console.log(`Server is running on ${address}`);
