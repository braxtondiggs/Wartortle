import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

describe('AppController', () => {
  let ProjectController: ProjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService]
    }).compile();

    ProjectController = app.get<ProjectController>(ProjectController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ProjectController.getProject('lastweek')).toBe('Hello World!');
    });
  });
});
