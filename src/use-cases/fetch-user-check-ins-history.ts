import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

export interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: Checkin[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns: Checkin[] | [] =
      await this.checkInsRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    };
  }
}
