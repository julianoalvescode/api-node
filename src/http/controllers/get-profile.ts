import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetProfileUseCase } from "@/use-cases/factories/make-get-profile-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserSchema = z.object({
    id: z.string(),
  });

  const { id } = authenticateUserSchema.parse(request.body);

  try {
    const authenticateUseCase = makeGetProfileUseCase();

    const { user } = await authenticateUseCase.execute({ userId: id });

    return {
      user,
    };
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }

  reply.status(200).send();
}
