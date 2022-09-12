import { IsString, IsDate, IsOptional, IsIn } from 'class-validator';
import { Editor } from './editor/editor.schema';
import { Language } from './language/language.schema';
import { Project } from './project/project.schema';

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
  Languages: Language[];
  Projects: Project[];
}
