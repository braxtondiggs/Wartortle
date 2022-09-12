import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'Projects', versionKey: false })
export class Project {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  total_seconds: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
