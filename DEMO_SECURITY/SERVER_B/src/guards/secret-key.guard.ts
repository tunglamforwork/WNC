import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretKeyGuard implements CanActivate {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secretKey = request.headers['x-api-key'];
    return secretKey === this.configService.get('SECRET_KEY');
  }
}
