import { IsString, IsDate, IsOptional, IsIn } from 'class-validator';
import { Editor } from './editor/editors.schema';

export const PARAMS = [
  'yesterday',
  'last7days',
  'last14days',
  'last30days',
  'thisweek',
  'lastweek',
  'thismonth',
  'lastmonth',
  'customrange'
] as const;

export class QueryDto {
  @IsIn(PARAMS)
  @IsString()
  range: string;

  @IsDate()
  @IsOptional()
  @IsString()
  start: string;

  @IsDate()
  @IsOptional()
  @IsString()
  end: string;
}

export class AppDto {
  Editors: Editor[];
}
