import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";
import { verifyUserRole } from "@/http/middlewares/only-admin";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/v1/:gymId/check-ins", create);
  app.post("/v1/check-ins/history", history);
  app.post("/v1/check-ins/metrics", metrics);
  app.post(
    "/v1/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
}
