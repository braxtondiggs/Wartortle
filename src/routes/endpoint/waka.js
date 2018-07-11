var WakaInstance = require('wakatime'),
  _ = require('lodash'),
  promise = require('promise'),
  moment = require('moment');
module.exports.getDaily = function() {
  return new Promise(function(resolve, reject) {
    var wi = new WakaInstance(process.env.WAKATIME_API);
    wi.summaries(moment().subtract(1, 'days').format('YYYY-MM-DD'), function(error, response, summary) {
      if (!error && response.statusCode == 200) {
        var summary = JSON.parse(summary);
        resolve({
          editors: _.map(summary.data[0].editors, function(editor) {
            return _.merge(_.pick(editor, ['name', 'total_seconds']), {
              date: summary.start
            });
          }),
          languages: _.map(summary.data[0].languages, function(language) {
            return _.merge(_.pick(language, ['name', 'total_seconds']), {
              date: summary.start
            });
          }),
          projects: _.map(summary.data[0].projects, function(projects) {
            return _.merge(_.pick(projects, ['name', 'total_seconds']), {
              date: summary.start
            });
          })
        });
      } else {
        reject(error);
      }
    });
  });
}
