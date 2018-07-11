'use strict';
import { dialogflow } from 'actions-on-google';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { GoogleIntents } from './intents';
import EndpointRouter from './routes/endpoint';
import WebHookRouter from './routes/webhook';

class App {
  public express: express.Application;
  public flow = dialogflow();
  public intents: GoogleIntents = new GoogleIntents(this.flow);
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.options('*', cors());
    this.express.use(bodyParser.json());
  }

  private routes(): void {
    this.express.use('/api', EndpointRouter);
    this.express.use('/webhook', WebHookRouter);
    this.express.use('/intents', this.flow);
  }
}
export default new App().express;
