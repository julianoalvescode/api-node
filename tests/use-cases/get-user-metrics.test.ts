import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "@/use-cases/get-user-metrics";
import { describe, it, expect, beforeEach } from "vitest";

let checkInRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Suit Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInRepository);
  });

  it("Should be able to get check-ins count from metrics", async () => {
    await checkInRepository.create({
      gym_id: "gym-id",
      user_id: "user-id-01",
    });

    await checkInRepository.create({
      gym_id: "gym-id-02",
      user_id: "user-id-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-id-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
