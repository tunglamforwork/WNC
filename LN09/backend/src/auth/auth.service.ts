import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  private user = {
    id: '1',
    email: 'test@gmail.com',
    password: '123456',
    name: 'Test',
  };

  async login(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    if (email === 'test@gmail.com' && password === '123456') {
      return this.user;
    }

    return null;
  }
}
