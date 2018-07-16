'use strict';
import { Document, Model, model, Schema } from 'mongoose';

export interface ILanguage extends Document {
  date: string;
  name: string;
  total_seconds: number;
}

export const LanguageSchema: Schema = new Schema({
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
}, { versionKey: false });

export const Language: Model<ILanguage> = model<ILanguage>('Languages', LanguageSchema, 'Languages');
