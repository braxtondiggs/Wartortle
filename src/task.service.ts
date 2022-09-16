import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import { WakaTime } from 'wakatime';
import { EditorService } from './editor/editor.service';
import { LanguageService } from './language/language.service';
import { ProjectService } from './project/project.service';
import { EditorDto } from './editor/editor.dto';
import { LanguageDto } from './language/language.dto';
import { ProjectDto } from './project/project.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private readonly waka = new WakaTime(process.env.WAKATIME_API);
  private readonly yesterday = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
  private readonly hcUrl =
    'https://hc-ping.com/4755b18c-2b59-4d13-a78a-5795dffb3b57';

  constructor(
    private readonly editor: EditorService,
    private readonly language: LanguageService,
    private readonly project: ProjectService,
    private readonly http: HttpService
  ) {}

  @Cron('59 3 * * *')
  async handleCron() {
    this.http.get(`${this.hcUrl}/start`).subscribe();
    const response = { editors: null, languages: null, projects: null };
    const { data, start } = await this.get();
    const { editors, languages, projects } = data[0];

    if (editors && editors.length > 0) {
      response.editors = this.format(editors, start);
      await this.editor.create(response.editors);
    }

    if (languages && languages.length > 0) {
      response.languages = this.format(languages, start);
      await this.language.create(response.languages);
    }

    if (projects && projects.length > 0) {
      response.projects = this.format(projects, start);
      await this.project.create(response.projects);
    }

    this.http.post(this.hcUrl, { ...response }).subscribe();
    return response;
  }

  async get() {
    try {
      return this.waka.summaries(this.yesterday);
    } catch (e) {
      this.logger.error(e.toString());
      this.http.post(`${this.hcUrl}/fail`, { error: e.toString() }).subscribe();
    }
  }

  private format(
    data: any[],
    date: string
  ): EditorDto[] | LanguageDto[] | ProjectDto[] {
    return data.map(({ name, total_seconds }) => ({
      name,
      total_seconds,
      date
    }));
  }
}
