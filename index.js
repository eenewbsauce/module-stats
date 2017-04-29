const crawl = require('osmosis');
const async = require('async');
const Module = require('./lib/').models.Module;
const siteTypes = require('./lib/constants').types.siteTypes;

let modules = new Set();
let results = {};

let circleImage = new Module('circleImage');
circleImage.addSite('www.npmjs.com/package/circle-image', siteTypes.npm);
circleImage.addSite('github.com/eenewbsauce/circle-image', siteTypes.github);

modules.add(circleImage);

async.each(modules, (mod, cb) => {
  console.log(`processing ${mod.name}`);

  crawl
    .get(mod.sites.npm.url)
    .find('.daily-downloads')
    .set('dailyDownloads')
    .data((data) => {
      results[mod.name] = data.dailyDownloads;

      cb();
    })
}, function(err) {
  if (err) {
    console.dir(err)
  } else{
    console.dir(results)
  }
});
