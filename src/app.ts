import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./prisma/prisma";

export const app = fastify({ logger: true });

app.post("/user", async (request, reply) => {
  const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  });

  const { email, password, name } = registerUserSchema.parse(request.body);

  await prisma.user.create({
    data: {
      email,
      password_hash: password,
      name,
    },
  });

  reply.status(201).send();
});
