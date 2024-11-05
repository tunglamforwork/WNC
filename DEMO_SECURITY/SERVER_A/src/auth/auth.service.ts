import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from 'src/entities/refresh-token.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,

    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username: username });
    if (user) {
      throw new ConflictException('Username already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async generateAccessToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  async generateRefreshToken(user: User) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    const hashedToken = await bcrypt.hash(token, 10);
    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: hashedToken,
      user,
    });
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return token;
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    const refreshTokenEntity = await this.refreshTokenRepository.findOne({
      where: { user: { id: payload.sub } },
      relations: ['user'],
    });

    if (
      !refreshTokenEntity ||
      !(await bcrypt.compare(refreshToken, refreshTokenEntity.token))
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateAccessToken(payload.sub);
  }

  async revokeRefreshToken(userId: string) {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }
}
