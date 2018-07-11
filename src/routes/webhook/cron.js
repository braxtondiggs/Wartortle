var WakaTime = require("./waka.js");
var MongoDB = require("./mongo.js");
module.exports.Cron = function() {
  WakaTime.getDaily().then(function(data) {
    MongoDB.save(data);
  });
}
this.Cron();
