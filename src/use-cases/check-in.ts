import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface ChecKInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export interface ChecKInUseCaseResponse {
  checkIn: Checkin;
}

export class ChecKInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: ChecKInUseCaseRequest): Promise<ChecKInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance: number = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error("User is too far from the gym");
    }
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error("User already checked in today");
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
