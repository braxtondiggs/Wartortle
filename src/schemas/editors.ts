'use strict';
import { Document, Model, model, Schema } from 'mongoose';

export interface IEditor extends Document {
  date: string;
  name: string;
  total_seconds: number;
}

export const EditorSchema: Schema = new Schema({
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

export const Editor: Model<IEditor> = model<IEditor>('Editor', EditorSchema, 'Editor');
