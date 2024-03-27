import { app } from "@/app";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function gymsRoutes(_fastify: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/v1/gyms/create", create);
}
