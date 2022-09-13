import { Test, TestingModule } from '@nestjs/testing';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';

describe('AppController', () => {
  let LanguageController: LanguageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LanguageController],
      providers: [LanguageService]
    }).compile();

    LanguageController = app.get<LanguageController>(LanguageController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(LanguageController.getLanguage('lastweek')).toBe('Hello World!');
    });
  });
});
