import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { UtilService } from 'src/util.service';
import { Language, LanguageSchema } from './language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])
  ],
  controllers: [LanguageController],
  providers: [LanguageService, UtilService]
})
export class LanguageModule {}
