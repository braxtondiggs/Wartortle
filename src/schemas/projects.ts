'use strict';
import { Document, Model, model, Schema } from 'mongoose';

export interface IProject extends Document {
  date: string;
  name: string;
  total_seconds: number;
}

export const ProjectSchema: Schema = new Schema({
  date: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  total_seconds: {
    required: true,
    type: Number
  }
});

export const Project: Model<IProject> = model<IProject>('Project', ProjectSchema, 'Project');
