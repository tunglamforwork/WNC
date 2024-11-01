import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Hash
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    delete user.password;

    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
