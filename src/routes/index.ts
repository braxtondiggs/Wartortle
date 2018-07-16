'use strict';
import { Router } from 'express';
import { check } from 'express-validator/check';
import EndpointController from './endpoint/endpoint.controller';

export class HomeRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.index();
  }

  private index() {
    this.router.get('/', [check(['range', 'start', 'end'])],
      EndpointController.all.bind(EndpointController));
  }
}

export default new HomeRouter().router;
