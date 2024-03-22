import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ChecKInUseCaseRequest {
  userId: string;
  gymId: string;
}

export interface ChecKInUseCaseResponse {
  checkIn: Checkin;
}

export class ChecKInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: ChecKInUseCaseRequest): Promise<ChecKInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
