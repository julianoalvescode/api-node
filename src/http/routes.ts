import { app } from "@/app";
import { register } from "./controllers/register";
import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(_fastify: FastifyInstance) {
  app.post("/v1/user", register);
  app.post("/v1/sessions", authenticate);
}
