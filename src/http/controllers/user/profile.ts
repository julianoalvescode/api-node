import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileUseCase } from "@/use-cases/factories/make-get-profile-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authenticateUseCase = makeGetProfileUseCase();

    const { user } = await authenticateUseCase.execute({
      userId: request.user.sub,
    });

    reply.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    });
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
