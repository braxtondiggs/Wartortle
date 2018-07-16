'use strict';
import { BasicCard, Button, DialogflowConversation, Image, List, SimpleResponse } from 'actions-on-google';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EndpointService } from '../routes/endpoint/endpoint.service';
import { Utils } from '../utils';

export class GoogleIntents {
  private utils: Utils = new Utils();
  private service: EndpointService = new EndpointService();
  constructor(actions: any) {
    // TODO: Add code
  }
}

export default GoogleIntents;
