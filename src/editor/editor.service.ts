import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from 'src/util.service';
import { EditorDto } from './editor.dto';
import { Editor, EditorDocument } from './editor.schema';

@Injectable()
export class EditorService {
  constructor(
    @InjectModel(Editor.name)
    private readonly editorModel: Model<EditorDocument>,
    private readonly utils: UtilService
  ) {}

  async get(range: string, start?: string, end?: string): Promise<Editor[]> {
    const { start: $gte, end: $lte } = this.utils.calcRange(range, start, end);
    const response = await this.editorModel
      .find({
        date: {
          $gte,
          $lte
        }
      })
      .exec();
    return this.utils.format(response);
  }

  async create(editor: EditorDto): Promise<Editor> {
    return await this.editorModel.create(editor);
  }
}
