import { Controller, Get, Query } from '@nestjs/common';
import { EditorService } from './editor.service';
import { QueryDto } from 'src/app.dto';
import { Editor } from './editors.schema';

@Controller('editor')
export class EditorController {
  constructor(private readonly editor: EditorService) {}

  @Get()
  getEditor(@Query() { range, start, end }: QueryDto): Promise<Editor[]> {
    return this.editor.get(range, start, end);
  }
}
