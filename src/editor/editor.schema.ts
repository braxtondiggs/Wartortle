import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EditorDocument = Editor & Document;

@Schema({ collection: 'Editors', versionKey: false })
export class Editor {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  total_seconds: number;
}

export const EditorSchema = SchemaFactory.createForClass(Editor);
