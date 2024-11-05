import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    try {
      return await this.authService.login(username, password);
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Post('register')
  async register(
    @Body() { username, password }: { username: string; password: string },
  ) {
    try {
      return await this.authService.register(username, password);
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      return {
        accessToken: await this.authService.refreshAccessToken(refreshToken),
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  async revokeToken(@Req() request: Request) {
    try {
      const user = request.user;
      const userId = user['sub'].toString() as string;

      await this.authService.revokeRefreshToken(userId);
      return {
        message: 'Token is revoked',
        data: null,
      };
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
}
