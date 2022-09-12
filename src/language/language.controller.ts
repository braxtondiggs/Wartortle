import { Controller, Get, Query } from '@nestjs/common';
import { LanguageService } from './language.service';
import { QueryDto } from 'src/app.dto';
import { Language } from './language.schema';

@Controller('language')
export class LanguageController {
  constructor(private readonly Language: LanguageService) {}

  @Get()
  getLanguage(@Query() { range, start, end }: QueryDto): Promise<Language[]> {
    return this.Language.get(range, start, end);
  }
}
