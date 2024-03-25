import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { ChecKInUseCase } from "@/use-cases/check-in";
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

    await gymRepository.items.push({
      id: "gym-id",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
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
});
