import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { ChecKInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export const makeCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new ChecKInUseCase(checkInsRepository, gymsRepository);

  return useCase;
};
