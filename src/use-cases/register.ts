import { UserRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exist";

interface RegisterUseCaseRequest {
  email: string;
  password: string;
  name: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(params: RegisterUseCaseRequest): Promise<void> {
    const { email, password, name } = params;

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    await this.userRepository.create({
      email,
      password_hash,
      name,
    });
  }
}
