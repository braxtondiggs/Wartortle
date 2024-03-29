import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from 'src/util.service';
import { ProjectDto } from './project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly utils: UtilService
  ) {}

  async get(range: string, start?: string, end?: string): Promise<Project[]> {
    const { start: $gte, end: $lte } = this.utils.calcRange(range, start, end);
    const response = await this.projectModel
      .find({
        date: {
          $gte,
          $lte
        }
      })
      .exec();
    return this.utils.format(response);
  }

  async create(project: ProjectDto): Promise<Project> {
    return await this.projectModel.create(project);
  }
}
