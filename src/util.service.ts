import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { Editor } from './editor/editor.schema';
import { PARAMS } from './app.dto';
import { Language } from './language/language.schema';
import { Project } from './project/project.schema';

@Injectable()
export class UtilService {
  constructor() {
    dayjs.extend(isoWeek);
  }

  calcRange(
    range: string,
    start?: string,
    end?: string
  ): { end: string; start: string } {
    range = _.indexOf(PARAMS, range) !== -1 ? range : 'thismonth';
    const date = {
      end: dayjs().toISOString(),
      start: ''
    };

    switch (range) {
      case 'yesterday':
        date.start = dayjs().subtract(2, 'days').toISOString();
        break;
      case 'last7days':
        date.start = dayjs().subtract(1, 'weeks').toISOString();
        break;
      case 'last14days':
        date.start = dayjs().subtract(2, 'weeks').toISOString();
        break;
      case 'last30days':
        date.start = dayjs().subtract(1, 'months').toISOString();
        break;
      case 'thisweek':
        date.start = dayjs().startOf('week').toISOString();
        date.end = dayjs().endOf('week').toISOString();
        break;
      case 'lastweek':
        date.start = dayjs()
          .subtract(1, 'weeks')
          .startOf('isoWeek')
          .toISOString();
        date.end = dayjs().subtract(1, 'weeks').endOf('isoWeek').toISOString();
        break;
      case 'thismonth':
        date.start = dayjs().startOf('month').toISOString();
        date.end = dayjs().endOf('month').toISOString();
        break;
      case 'lastmonth':
        date.start = dayjs()
          .subtract(1, 'months')
          .startOf('month')
          .toISOString();
        date.end = dayjs().subtract(1, 'months').endOf('month').toISOString();
        break;
      case 'customrange':
        date.start = dayjs(start, 'MMM Do YYYY').toISOString();
        date.end = dayjs(end, 'MMM Do YYYY').add(1, 'days').toISOString();
        break;
    }
    return date;
  }

  format(data: Editor[] | Language[] | Project[], isTimeline = false) {
    const objName = ['total_seconds'];
    objName.push(isTimeline ? 'date' : 'name');
    return _.chain(data)
      .groupBy((o) => (isTimeline ? o.date : o.name))
      .map((o) =>
        _.chain(o)
          .reduceRight((current: any, next: any) => ({
            date: isTimeline ? next.date : null,
            name: !isTimeline ? next.name : null,
            total_seconds: current.total_seconds + next.total_seconds
          }))
          .pickBy(_.identity)
          .pick(objName)
          .value()
      )
      .reject((o: { total_seconds: number }) => _.isUndefined(o.total_seconds))
      .value() as Editor[] | Language[] | Project[];
  }
}
