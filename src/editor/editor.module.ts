import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditorController } from './editor.controller';
import { EditorService } from './editor.service';
import { UtilService } from 'src/util.service';
import { Editor, EditorSchema } from './editors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Editor.name, schema: EditorSchema }])
  ],
  controllers: [EditorController],
  providers: [EditorService, UtilService]
})
export class EditorModule {}
