'use strict';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Editor, IEditor, ILanguage, IProject, Language, Project } from './schemas';

export class Utils {
  public calcRange(range: string, start?: string, end?: string): { end: string, start: string } {
    const params = ['yesterday', 'last7days', 'last14days', 'last30days', 'thisweek', 'lastweek', 'thismonth', 'lastmonth', 'customrange'];
    range = _.indexOf(params, range) !== -1 ? range : 'thismonth';
    const date = {
      end: moment().toISOString(),
      start: ''
    };
    switch (range) {
      case 'yesterday':
        date.start = moment().subtract(2, 'days').toISOString();
        break;
      case 'last7days':
        date.start = moment().subtract(1, 'weeks').toISOString();
        break;
      case 'last14days':
        date.start = moment().subtract(2, 'weeks').toISOString();
        break;
      case 'last30days':
        date.start = moment().subtract(1, 'months').toISOString();
        break;
      case 'thisweek':
        date.start = moment().startOf('week').toISOString();
        date.end = moment().endOf('week').toISOString();
        break;
      case 'lastweek':
        date.start = moment().subtract(1, 'weeks').startOf('isoWeek').toISOString();
        date.end = moment().subtract(1, 'weeks').endOf('isoWeek').toISOString();
        break;
      case 'thismonth':
        date.start = moment().startOf('month').toISOString();
        date.end = moment().endOf('month').toISOString();
        break;
      case 'lastmonth':
        date.start = moment().subtract(1, 'months').startOf('month').toISOString();
        date.end = moment().subtract(1, 'months').endOf('month').toISOString();
        break;
      case 'customrange':
        date.start = moment(start, 'MMM Do YYYY').toISOString();
        date.end = moment(end, 'MMM Do YYYY').add(1, 'days').toISOString();
        break;
    }
    return date;
  }

  public async getEditors(range: string, start?: string, end?: string) {
    const date = this.calcRange(range, start, end);
    return this.format(await Editor.find({
      date: {
        $gte: date.start,
        $lte: date.end
      }
    }));
  }

  public async getLanguages(range: string, start?: string, end?: string) {
    const date = this.calcRange(range, start, end);
    return this.format(await Language.find({
      date: {
        $gte: date.start,
        $lte: date.end
      }
    }));
  }

  public async getProjects(range: string, start?: string, end?: string) {
    const date = this.calcRange(range, start, end);
    return this.format(await Project.find({
      date: {
        $gte: date.start,
        $lte: date.end
      }
    }));
  }

  public async getTimeline(range: string, start?: string, end?: string) {
    const date = this.calcRange(range, start, end);
    return this.format(await Language.find({
      date: {
        $gte: date.start,
        $lte: date.end
      }
    }), true);
  }

  public async save(waka: any): Promise<any> {
    if (!_.isEmpty(waka.editors)) await Editor.update({}, waka.editors, { multi: false });
    if (!_.isEmpty(waka.languages)) await Language.update({}, waka.languages, { multi: false });
    if (!_.isEmpty(waka.projects)) await Project.update({}, waka.projects, { multi: false });
  }

  private format(data: IEditor[] | ILanguage[] | IProject[], isTimeline: boolean = false): Array<({ name?: string, date?: string, total_seconds?: number } | undefined)> {
    return _.chain(data)
      .groupBy((o) => isTimeline ? o.date : o.name)
      .map((o) =>
        _.chain(o).reduce((current: any, next: any) => ({
          date: isTimeline ? next.date : null,
          name: !isTimeline ? next.name : null,
          total_seconds: current.total_seconds + next.total_seconds
        })).pickBy(_.identity).pick(['date', 'name', 'total_seconds']).value())
      .value();
  }
}

export default Utils;
