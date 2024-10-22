import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageService } from './language.service';

@Controller('language')
@ApiTags('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
