# Wartortle ![Wartortle](cryptonym.png)

Integration with [WakaTime](https://wakatime.com) to grab data for [my personal website](http://braxtondiggs.com)

## Getting Started

### Prerequisites

- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs) Heroku ^5.6.8
- [Node Foreman](https://github.com/strongloop/node-foreman) (`npm install --global foreman`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `heroku config:get WAKATIME_API -s  >> .env && heroku config:get MONGODB_URI -s  >> .env` to install Heroku Environment Variables.

3. Run `nf start` to start the development server.
