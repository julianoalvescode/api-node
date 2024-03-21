import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Suit get user profile case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to get user profile", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: id,
    });

    expect(user?.id).toEqual(expect.any(String));
  });

  it("Should not be able to get user profile wrong id", async () => {
    expect(
      async () =>
        await sut.execute({
          userId: "non-exist-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
