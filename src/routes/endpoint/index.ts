'use strict';
import { Router } from 'express';
import { check } from 'express-validator/check';
import EndpointController from './endpoint.controller';

export class EndpointRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.editors();
    this.languages();
    this.projects();
    this.timeline();
    this.index();
  }

  private editors() {
    this.router.get('/editors', [check(['range', 'start', 'end'])],
      EndpointController.editors.bind(EndpointController));
  }

  private languages() {
    this.router.get('/languages', [check(['range', 'start', 'end'])],
      EndpointController.languages.bind(EndpointController));
  }

  private projects() {
    this.router.get('/projects', [check(['range', 'start', 'end'])],
      EndpointController.projects.bind(EndpointController));
  }

  private timeline() {
    this.router.get('/timeline', [check(['range', 'start', 'end'])],
      EndpointController.timeline.bind(EndpointController));
  }

  private index() {
    this.router.get('/', [check(['range', 'start', 'end'])],
      EndpointController.all.bind(EndpointController));
  }
}

export default new EndpointRouter().router;
