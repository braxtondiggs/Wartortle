var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
var MongoDB = require('./app/mongo.js');
app.use(bodyParser.json());
app.use(cors());
app.get('/', function(req, res) {
  var params = ['week', 'month', 'half_year', 'year', 'all'];
  if (req.query.range && _.indexOf(params, req.query.range) !== -1) {
    MongoDB.get(req.query.range)
      .then(function(data) {
        res.status(200)
          .json(data);
      })
  } else {
    res.status(500)
      .send('Something broke!');
  }
});
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address()
    .port;
  console.log('App now running on port', port);
});
