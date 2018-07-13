'use strict';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator/filter';
import { EndpointService } from './endpoint.service';

export class EndpointController {
  private service: EndpointService = new EndpointService();

  public async editors(req: Request, res: Response) {
    const query: any = matchedData(req, { locations: ['query'] });
    res.json(await this.service.editors(query.range, query.start, query.end));
  }

  public async languages(req: Request, res: Response) {
    const query: any = matchedData(req, { locations: ['query'] });
    res.json(await this.service.languages(query.range, query.start, query.end));
  }

  public async projects(req: Request, res: Response) {
    const query: any = matchedData(req, { locations: ['query'] });
    res.json(await this.service.projects(query.range, query.start, query.end));
  }

  public async timeline(req: Request, res: Response) {
    const query: any = matchedData(req, { locations: ['query'] });
    res.json(await this.service.timeline(query.range, query.start, query.end));
  }

  public async all(req: Request, res: Response) {
    const query: any = matchedData(req, { locations: ['query'] });
    res.json({
      Editors: await this.service.editors(query.range, query.start, query.end),
      Languages: await this.service.languages(query.range, query.start, query.end),
      Projects: await this.service.projects(query.range, query.start, query.end),
      Timeline: await this.service.timeline(query.range, query.start, query.end)
    });
  }
}

export default new EndpointController();
