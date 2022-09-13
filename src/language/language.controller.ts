import { Controller, Get, Query } from '@nestjs/common';
import { LanguageService } from './language.service';
import { QueryDto } from 'src/app.dto';
import { Language } from './language.schema';

@Controller('language')
export class LanguageController {
  constructor(private readonly language: LanguageService) {}

  @Get()
  getLanguage(@Query() { range, start, end }: QueryDto): Promise<Language[]> {
    return this.language.get(range, start, end);
  }

  @Get('timeline')
  getTimeline(@Query() { range, start, end }: QueryDto): Promise<Language[]> {
    return this.language.get(range, start, end, true);
  }
}
