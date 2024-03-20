import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist";

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
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    return reply.status(500).send();
  }

  reply.status(201).send();
}
