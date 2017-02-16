var WakaInstance = require('wakatime'),
  _ = require('lodash'),
  promise = require('promise');
module.exports.getDaily = function() {
  return new Promise(function(resolve, reject) {
    var wi = new WakaInstance(process.env.WAKATIME_API);
    wi.summaries(new Date(), function(error, response, summary) {
      if (!error && response.statusCode == 200) {
        var summary = JSON.parse(summary);
        resolve(formatJSON(summary.data[0], summary.start));
      } else {
        reject(error);
      }
    });
  });
}
module.exports.getRange = function(date) {
  return new Promise(function(resolve, reject) {
    var wi = new WakaInstance(process.env.WAKATIME_API);
    wi.summaries(date, function(error, response, summary) {
      if (!error && response.statusCode == 200) {
        var summary = JSON.parse(summary);
        var data = [];
        _.forEach(summary.data, function(value, key) {
          var json = formatJSON(value, value.range.start);
          if (!_.isEmpty(json.languages)) {
            data.push(json);
          }
        });
        resolve(data);
      }
    });
  });
}

function formatJSON(summary, date) {
  return {
    editors: _.map(summary.editors, function(editor) {
      return _.merge(_.pick(editor, ['name', 'total_seconds']), {
        date: date
      });
    }),
    languages: _.map(summary.languages, function(language) {
      return _.merge(_.pick(language, ['name', 'total_seconds']), {
        date: date
      });
    }),
    projects: _.map(summary.projects, function(projects) {
      return _.merge(_.pick(projects, ['name', 'total_seconds']), {
        date: date
      });
    })
  };
}
