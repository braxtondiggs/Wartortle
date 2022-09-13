import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema({ collection: 'Languages', versionKey: false })
export class Language {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  total_seconds: number;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
