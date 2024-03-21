import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentials } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateUserSchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }

  reply.status(200).send();
}
