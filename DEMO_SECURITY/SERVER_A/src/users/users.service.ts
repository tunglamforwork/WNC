import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      username: 'john',
      password: 'admin',
    },
    {
      id: '2',
      username: 'david',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
