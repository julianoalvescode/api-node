import { app } from "@/app";
import { register } from "./controllers/register";
import { FastifyInstance } from "fastify";

export async function appRoutes(_fastify: FastifyInstance) {
  app.post("/user", register);
}
