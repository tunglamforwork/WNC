import {
  CreateUserDto,
  UserId,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(userId: UserId) {
    return this.usersService.findOne(userId.id);
  }
}
