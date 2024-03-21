import { prisma } from "@/prisma/prisma";
import { Prisma, User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserRepository } from "./../users-repository";

export class PrismaUserRepository implements UserRepository {
  async create(params: Prisma.UserCreateInput): Promise<User> {
    const { email, password_hash, name } = params;
    const _password_hash = await hash(password_hash, 10);
    return await prisma.user.create({
      data: {
        email,
        password_hash: _password_hash,
        name,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
