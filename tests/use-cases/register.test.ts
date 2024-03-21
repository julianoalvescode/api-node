import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist";
import { RegisterUseCase } from "@/use-cases/register";
import { compare } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

let userRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe("Suit register use case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(userRepository);
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register a user with the same email", async () => {
    const email = "jonhdoe@gmail.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
