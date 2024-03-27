import { app } from "@/app";
import { register } from "./register";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function usersRouter(_fastify: FastifyInstance) {
  app.post("/v1/user", register);
  app.post("/v1/sessions", authenticate);
  app.post("/v1/profile", { onRequest: [verifyJwt] }, profile);
}
