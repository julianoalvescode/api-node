import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "@/use-cases/create-gym";
import { describe, it, expect, beforeEach } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Suit register use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("Should able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym",
      description: null,
      latitude: 6.3447347,
      longitude: -75.6112468,
      phone: null,
    });

    expect(gym).toEqual(expect.any(Object));
  });
});
