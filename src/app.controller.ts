import { Controller, Get, Query } from '@nestjs/common';
import { AppDto, QueryDto } from './app.dto';
import { EditorService } from './editor/editor.service';

@Controller()
export class AppController {
  constructor(private readonly editor: EditorService) {}

  @Get()
  async get(@Query() { range, start, end }: QueryDto): Promise<AppDto> {
    const Editors = await this.editor.get(range, start, end);
    return {
      Editors
    };
  }
}
