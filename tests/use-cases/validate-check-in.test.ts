import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { ValidateCheckInUseCase } from "@/use-cases/validate-check-in";
import { randomUUID } from "crypto";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Suit Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it("Should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: "gym-id",
      user_id: "user-id",
      created_at: new Date(),
      id: randomUUID(),
      validated_at: null,
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("Should not be able to validate and inexistent the check-in", async () => {
    expect(
      async () =>
        await sut.execute({
          checkInId: "inexistent-check-in-id",
        })
    ).rejects.toThrowError(ResourceNotFoundError);
  });
});
