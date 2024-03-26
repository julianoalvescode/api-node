import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { ChecKInUseCase } from "@/use-cases/check-in";
import { MaxDistanceError } from "@/use-cases/errors/max-distance-error";
import { Decimal } from "@prisma/client/runtime/library";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

let checkInRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymsRepository;
let sut: ChecKInUseCase;

describe("Suit check in case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymsRepository();
    sut = new ChecKInUseCase(checkInRepository, gymRepository);

    await gymRepository.create({
      id: "gym-id",
      latitude: 6.3447347,
      longitude: -75.6112468,
      title: "Gym",
      description: "Gym description",
      phone: "123456",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to check-in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 6.3447347,
      userLongitude: -75.6112468,
    });

    expect(checkIn?.gym_id).toEqual(expect.any(String));
  });

  it("Should be able to check-in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 6.3447347,
      userLongitude: -75.6112468,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 6.3447347,
      userLongitude: -75.6112468,
    });

    expect(checkIn?.gym_id).toEqual(expect.any(String));
  });

  it("Should not be able to check-in in on distant gym", async () => {
    gymRepository.items.push({
      id: "gym-02",
      latitude: new Decimal(-22.8768314),
      longitude: new Decimal(-43.2660772),
      title: "Gym",
      description: "Gym description",
      phone: "123456",
    });

    expect(
      async () =>
        await sut.execute({
          gymId: "gym-02",
          userId: "user-id",
          userLatitude: 6.3447347,
          userLongitude: -75.6112468,
        })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
