import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ChecKInUseCase } from "@/use-cases/check-in";
import { describe, it, expect, beforeEach } from "vitest";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ChecKInUseCase;

describe("Suit check in case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ChecKInUseCase(checkInRepository);
  });

  it("Should be able to check-in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    expect(checkIn?.gym_id).toEqual(expect.any(String));
  });
});
