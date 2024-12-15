import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    // Bearer `access_token`
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      this.logger.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
