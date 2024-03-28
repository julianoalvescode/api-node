import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  await makeValidateCheckInUseCase().execute({
    checkInId: checkInId,
  });

  reply.status(201).send();
}
