'use strict';
import { Utils } from '../../utils';

export class EndpointService {
  private utils: Utils = new Utils();

  public async editors(range: string, start?: string, end?: string) {
    return await this.utils.getEditors(range, start, end);
  }

  public async languages(range: string, start?: string, end?: string) {
    return await this.utils.getLanguages(range, start, end);
  }

  public async projects(range: string, start?: string, end?: string) {
    return await this.utils.getProjects(range, start, end);
  }

  public async timeline(range: string, start?: string, end?: string) {
    return await this.utils.getTimeline(range, start, end);
  }
}

export default EndpointService;
