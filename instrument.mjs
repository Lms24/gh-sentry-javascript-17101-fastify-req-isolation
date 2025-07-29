import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://b5f29bfe807c4898b0f4a155c797c936@o447951.ingest.us.sentry.io/4505583202074624",
  tracesSampleRate: 1.0,
  debug: true,
  integrations: [
    Sentry.fastifyIntegration({
      shouldHandleError: (e) => {
        console.log("fastify shouldHandleError", e);
        return false;
      },
    }),
  ],
  beforeSendTransaction: (txn) => {
    console.log("beforeSendTransaction", txn.contexts.trace);
    return txn;
  },
  beforeSend: (event) => {
    console.log("beforeSend", event.exception?.values[0]);
    return event;
  },
});
