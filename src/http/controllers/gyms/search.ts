import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, q } = searchSchema.parse(request.body);

  const { gyms } = await makeSearchGymsUseCase().execute({
    page,
    query: q,
  });

  reply.status(200).send({ gyms });
}
