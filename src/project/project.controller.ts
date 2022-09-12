import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { QueryDto } from 'src/app.dto';
import { Project } from './project.schema';

@Controller('project')
export class ProjectController {
  constructor(private readonly project: ProjectService) {}

  @Get()
  getProject(@Query() { range, start, end }: QueryDto): Promise<Project[]> {
    return this.project.get(range, start, end);
  }
}
