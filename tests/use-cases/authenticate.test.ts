import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
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
});
