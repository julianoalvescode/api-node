import { User } from "@prisma/client";
import { UserRepository } from "../users-repository";

export class InMemoryUsersRepository implements UserRepository {
  private items: User[] = [];

  async create(data: User): Promise<User> {
    this.items.push(data);

    return data;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    return user || null;
  }
}
