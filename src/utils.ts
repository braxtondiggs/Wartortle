'use strict';
import { Editor, IEditor, ILanguage, IProject, Language, Project } from './schemas';

import * as _ from 'lodash';
import * as moment from 'moment';

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
}

export default Utils;
