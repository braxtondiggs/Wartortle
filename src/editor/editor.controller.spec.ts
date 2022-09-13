import { Test, TestingModule } from '@nestjs/testing';
import { EditorController } from './editor.controller';
import { EditorService } from './editor.service';

describe('AppController', () => {
  let editorController: EditorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EditorController],
      providers: [EditorService]
    }).compile();

    editorController = app.get<EditorController>(EditorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(editorController.getEditor('lastweek')).toBe('Hello World!');
    });
  });
});
