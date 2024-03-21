import { RegisterUseCase } from "@/use-cases/register";
import { compare } from "bcryptjs";
import { describe, it, expect } from "vitest";

describe("Suit register use case", () => {
  it("Should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(_email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

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
});
