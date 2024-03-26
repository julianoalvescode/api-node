import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "@/use-cases/search-gyms";
import { describe, it, expect, beforeEach } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Suit Search Gyms in case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Gym 1",
      description: null,
      latitude: 6.3447347,
      longitude: -75.6112468,
      phone: null,
    });

    await gymsRepository.create({
      title: "Gym 2",
      description: null,
      latitude: 6.3447347,
      longitude: -75.6112468,
      phone: null,
    });

    const { gyms } = await sut.execute({
      query: "Gym 1",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Gym 1" })]);
  });

  it("Should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        latitude: 6.3447347,
        longitude: -75.6112468,
        phone: null,
      });
    }

    const { gyms } = await sut.execute({
      query: "20",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Gym 20" })]);
  });
});
