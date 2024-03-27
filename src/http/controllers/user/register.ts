import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  });

  const { email, password, name } = registerUserSchema.parse(request.body);

  try {
    await makeRegisterUseCase().execute({
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

    throw err;
  }

  reply.status(201).send();
}
