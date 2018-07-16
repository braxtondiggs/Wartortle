'use strict';
import { Router } from 'express';
import WebHookController from './webhook.controller';

export class WebHookRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.webhook();
  }
  private webhook() {
    this.router.get('/', [], WebHookController.index.bind(WebHookController));
  }
}

export default new WebHookRouter().router;
