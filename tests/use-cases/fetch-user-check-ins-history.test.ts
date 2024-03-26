import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "@/use-cases/fetch-user-check-ins-history";
import { describe, it, expect, beforeEach } from "vitest";

let checkInRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Suit Fetch Check-in History in case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository);
  });

  it("Should be able to fetch check-in history", async () => {
    await checkInRepository.create({
      gym_id: "gym-id",
      user_id: "user-id-01",
    });

    await checkInRepository.create({
      gym_id: "gym-id-02",
      user_id: "user-id-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-id-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-id" }),
      expect.objectContaining({ gym_id: "gym-id-02" }),
    ]);
  });

  it("Should be able to fetch paginated user check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
