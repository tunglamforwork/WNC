import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await firstValueFrom(
      this.authClient.send('createUser', createUserDto),
    );
    return user;
  }

  findAll() {
    return this.authClient.send('findAllUser', {});
  }

  findOne(id: string) {
    return this.authClient.send('findOneUser', { id });
  }
}
