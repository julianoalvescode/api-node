import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify({ logger: true });

const prisma = new PrismaClient();

app.post("/user", async (request, reply) => {
  const { name, email } = request.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  reply.send(user);
});
