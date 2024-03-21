import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentials } from "@/use-cases/errors/invalid-credentials-error";
import { hash } from "bcryptjs";
import { describe, it, expect } from "vitest";

describe("Suit authenticate case", () => {
  it("Should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user?.id).toEqual(expect.any(String));
  });

  it("Should be able to authenticate with wrong e-mail", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(
      async () =>
        await sut.execute({
          email: "johndoe@gmail.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it("Should be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    expect(
      async () =>
        await sut.execute({
          email: "johndoe@gmail.com",
          password: "123452323236",
        })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
