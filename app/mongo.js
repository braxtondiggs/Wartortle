var MongoClient = require('mongodb').MongoClient,
  promise = require('promise'),
  _ = require('lodash'),
  moment = require('moment');
module.exports.get = function(range, start, end) {
  function calcRange(range) {
    var date = {
      end: moment().toISOString()
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
  return new Promise(function(resolve, reject) {
    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) reject(err);
      var date = calcRange(range);
      var editorPromise = new Promise(function(res, rej) {
        var cursor = db.collection('Editors').find({
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
        var cursor = db.collection('Languages').find({
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
      var projectPromise = new Promise(function(res, rej) {
        var cursor = db.collection('Projects').find({
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
      Promise.all([editorPromise, languagePromise, projectPromise]).then(function(values) {
        resolve({
          'Editors': formatValue(values[0]),
          'Languages': formatValue(values[1]),
          'Timeline': formatTimeline(values[1]),
          'Projects': formatTimeline(values[2])
        });
        db.close();
      }).catch(function(reason) {
        reject(reason);
      });
    });

    function formatValue(data) {
      return _.chain(data).groupBy(function(e) {
        return e.name;
      }).map(function(group) {
        return _.reduce(group, function(current, next) {
          return {
            name: next.name,
            total_seconds: current.total_seconds + next.total_seconds
          };
        });
      }).value();
    }

    function formatTimeline(timeline) {
      return _.chain(timeline).groupBy(function(e) {
        return e.date;
      }).map(function(group) {
        return _.reduce(group, function(current, next) {
          return {
            total_seconds: current.total_seconds + next.total_seconds,
            date: next.date
          };
        });
      }).value();
    }
  });
}
module.exports.save = function(waka) {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (!err) {
      if (!_.isEmpty(waka.editors)) {
        db.collection('Editors').insert(waka.editors);
      }
      if (!_.isEmpty(waka.languages)) {
        db.collection('Languages').insert(waka.languages);
      }
      if (!_.isEmpty(waka.projects)) {
        db.collection('Projects').insert(waka.projects);
      }
    } else {
      console.log(err);
    }
    db.close();
  });
}
