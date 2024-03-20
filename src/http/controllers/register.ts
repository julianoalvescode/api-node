import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUserRepository } from "@/repositories/prisma-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  });

  const { email, password, name } = registerUserSchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUserRepository();
    await new RegisterUseCase(prismaUsersRepository).execute({
      email,
      password,
      name,
    });
  } catch (err) {
    return reply.status(400).send();
  }

  reply.status(201).send();
}
