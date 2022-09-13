import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from 'src/util.service';
import { LanguageDto } from './language.dto';
import { Language, LanguageDocument } from './language.schema';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name)
    private readonly languageModel: Model<LanguageDocument>,
    private readonly utils: UtilService
  ) {}

  async get(
    range: string,
    start?: string,
    end?: string,
    timeline = false
  ): Promise<Language[]> {
    const { start: $gte, end: $lte } = this.utils.calcRange(range, start, end);
    const response = await this.languageModel
      .find({
        date: {
          $gte,
          $lte
        }
      })
      .exec();
    return this.utils.format(response, timeline);
  }

  async create(language: LanguageDto): Promise<Language> {
    return await this.languageModel.create(language);
  }
}
