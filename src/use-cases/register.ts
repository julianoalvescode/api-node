import { prisma } from "@/prisma/prisma";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  email: string;
  password: string;
  name: string;
}

export async function registerUseCase(params: RegisterUseCaseRequest) {
  const { email, password, name } = params;

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: {
      email,
      password_hash,
      name,
    },
  });
}
