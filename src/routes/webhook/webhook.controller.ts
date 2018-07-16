'use strict';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as rq from 'request-promise';
import { Utils } from '../../utils';
const WakaTime = require('wakatime');

export class WebHookController {
  private utils: Utils = new Utils();
  private wi: any = new WakaTime(process.env.WAKATIME_API);

  public async index(req: Request, res: Response) {
    this.wi.summaries(moment().subtract(1, 'days').format('YYYY-MM-DD'), async (error: any, response: any, summary: any) => {
      if (!error && response.statusCode === 200) {
        summary = JSON.parse(summary);
        const data = {
          editors: this.format(summary.data[0].editors, summary.start),
          languages: this.format(summary.data[0].languages, summary.start),
          projects: this.format(summary.data[0].projects, summary.start)
        };
        await this.utils.save(data);
        await rq.get('https://nosnch.in/3bea1c94f0');
        res.json(data);
      } else {
        res.status(422).json({ errors: error.mapped() });
      }
    });
  }

  private format(response: any, start: string): any {
    return _.map(response, (o) =>
      _.merge(_.pick(o, ['name', 'total_seconds']), {
        date: start
      })
    );
  }
}

export default new WebHookController();
