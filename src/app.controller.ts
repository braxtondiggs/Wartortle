import { Controller, Get, Query } from '@nestjs/common';
import { AppDto, QueryDto } from './app.dto';
import { EditorService } from './editor/editor.service';
import { LanguageService } from './language/language.service';
import { ProjectService } from './project/project.service';
import { TaskService } from './task.service';

@Controller()
export class AppController {
  constructor(
    private readonly editor: EditorService,
    private readonly language: LanguageService,
    private readonly project: ProjectService,
    private readonly task: TaskService
  ) {}

  @Get()
  async get(@Query() { range, start, end }: QueryDto): Promise<AppDto> {
    return {
      Editors: await this.editor.get(range, start, end),
      Languages: await this.language.get(range, start, end),
      Projects: await this.project.get(range, start, end),
      Timeline: await this.language.get(range, start, end, true)
    };
  }

  @Get('waka')
  async waka(): Promise<any> {
    return this.task.get();
  }
}
