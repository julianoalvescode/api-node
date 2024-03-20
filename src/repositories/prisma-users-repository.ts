import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

export class PrismaUserRepository {
  async create(params: Prisma.UserCreateInput): Promise<void> {
    const { email, password_hash, name } = params;
    const _password_hash = await hash(password_hash, 6);
    await prisma.user.create({
      data: {
        email,
        password_hash: _password_hash,
        name,
      },
    });
  }
}
