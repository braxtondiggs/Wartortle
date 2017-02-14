var MongoClient = require('mongodb')
  .MongoClient,
  promise = require('promise'),
  _ = require('lodash'),
  moment = require('moment');
module.exports.get = function(range) {
  function calcRange(range) {
    var date = {
      end: moment()
        .toISOString()
    };
    switch (range) {
      case 'week':
        date.start = moment()
          .subtract(1, 'weeks')
          .toISOString();
        break;
      case 'month':
        date.start = moment()
          .subtract(1, 'months')
          .toISOString();
        break;
      case 'half_year':
        date.start = moment()
          .subtract(6, 'months')
          .toISOString();
        break;
      case 'year':
        date.start = moment()
          .subtract(1, 'years')
          .toISOString();
        break;
      case 'all':
        date.start = moment('2017-01-31')
          .toISOString();
        break;
    }
    return date;
  }
  return new Promise(function(resolve, reject) {
    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) reject(err);
      var date = calcRange(range);
      var editorPromise = new Promise(function(res, rej) {
        var cursor = db.collection('Editors')
          .find({
            date: {
              $gte: date.start,
              $lte: date.end
            }
          }, function(err, cursor) {
            cursor.toArray(function(err, items) {
              if (err) rej(err);
              res(items);
            });
          });
      });
      var languagePromise = new Promise(function(res, rej) {
        var cursor = db.collection('Languages')
          .find({
            date: {
              $gte: date.start,
              $lte: date.end
            }
          }, function(err, cursor) {
            cursor.toArray(function(err, items) {
              if (err) rej(err);
              res(items);
            });
          });
      });
      Promise.all([editorPromise, languagePromise])
        .then(function(values) {
          resolve({
            'Editors': values[0],
            'Languages': values[1]
          });
          db.close();
        })
        .catch(function(reason) {
          reject(reason);
        });
    });
  });
}
module.exports.save = function(waka) {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (!err) {
      if (!_.isEmpty(waka.editors)) {
        db.collection('Editors')
          .insert(waka.editors);
      }
      if (!_.isEmpty(waka.languages)) {
        db.collection('Languages')
          .insert(waka.languages);
      }
    } else {
      console.log(err);
    }
    db.close();
  });
}
