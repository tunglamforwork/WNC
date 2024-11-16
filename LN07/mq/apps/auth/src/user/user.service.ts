import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly users = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({ username: randomUUID(), password: randomUUID() });
    }
  }
  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
