import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';
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

  @IsDateString({ strict: true })
  @IsOptional()
  start: string;

  @IsDateString({ strict: true })
  @IsOptional()
  end: string;
}

export class Timeline {
  date?: string;
  total_seconds: number;
}

export class AppDto {
  Editors: Editor[];
  Languages: Language[];
  Projects: Project[];
  Timeline: Timeline[];
}
