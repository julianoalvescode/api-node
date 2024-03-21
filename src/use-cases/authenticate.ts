import { UserRepository } from "@/repositories/users-repository";
import { compare, hash, hashSync } from "bcryptjs";
import { InvalidCredentials } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    console.log(user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentials();
    }

    return {
      user,
    };
  }
}
