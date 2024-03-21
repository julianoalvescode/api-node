import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export const makeGetProfileUseCase = () => {
  const prismaUsersRepository = new PrismaUserRepository();
  const getProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository);

  return getProfileUseCase;
};
