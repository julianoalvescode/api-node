import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  });

  const createBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createBodySchema.parse(request.body);
  const { gymId } = createCheckInParamsSchema.parse(request.params);

  await makeCheckInUseCase().execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: request.user.sub,
  });

  reply.status(201).send();
}
