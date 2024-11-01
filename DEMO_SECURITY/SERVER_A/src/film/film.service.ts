import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilmService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async findAll() {
    const secretKey = this.configService.get<string>('SECRET_KEY');
    const response = await this.httpService
      .get('http://localhost:3001/film', {
        headers: {
          'x-api-key': secretKey,
        },
      })
      .toPromise();
    console.log('RESONPOSE', response);
    return response.data;
  }
}
