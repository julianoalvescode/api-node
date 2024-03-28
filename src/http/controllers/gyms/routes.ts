import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { search } from "./search";
import { nearby } from "./nearby";
import { verifyUserRole } from "@/http/middlewares/only-admin";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);
  app.post("/v1/gyms/search", search);
  app.post("/v1/gyms/nearby", nearby);

  // This route is protected by the verifyUserRole middleware
  app.post("/v1/gyms/create", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
