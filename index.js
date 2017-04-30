const async = require('async');
const Module = require('./lib/').models.Module;
const siteTypes = require('./lib/constants').types.siteTypes;
const Scraping = require('./lib/helpers').Scraping;

let modules = new Set();
let output = {
  npm: new Set(),
  github: new Set()
};

let circleImage = new Module('circleImage');
circleImage.addSite('www.npmjs.com/package/circle-image', siteTypes.npm);
circleImage.addSite('github.com/eenewbsauce/circle-image', siteTypes.github);
modules.add(circleImage);

let anyArgs = new Module('anyArgs');
anyArgs.addSite('www.npmjs.com/package/anyargs', siteTypes.npm);
anyArgs.addSite('github.com/eenewbsauce/anyargs', siteTypes.github);
modules.add(anyArgs);

let reactAddRedux = new Module('reactAddRedux');
reactAddRedux.addSite('www.npmjs.com/package/create-react-app-add-redux', siteTypes.npm);
reactAddRedux.addSite('github.com/eenewbsauce/create-react-app-add-redux', siteTypes.github);
modules.add(reactAddRedux);

let fullStory = new Module('fullStory');
fullStory.addSite('www.npmjs.com/package/fullstory', siteTypes.npm);
fullStory.addSite('github.com/eenewbsauce/fullstory', siteTypes.github);
modules.add(fullStory);

let githubProjects = new Module('githubProjects');
githubProjects.addSite('www.npmjs.com/package/github-projects', siteTypes.npm);
githubProjects.addSite('github.com/eenewbsauce/github-projects', siteTypes.github);
modules.add(githubProjects);

let syncSyncCtor = new Module('syncSyncCtor');
syncSyncCtor.addSite('www.npmjs.com/package/sync-async-ctor', siteTypes.npm);
syncSyncCtor.addSite('github.com/eenewbsauce/sync-async-ctor', siteTypes.github);
modules.add(syncSyncCtor);

async.each(modules, (mod, eachCb) => {
  async.parallel({
    npm: (cb) => {
      Scraping.multipleItem(mod, siteTypes.npm, {
        'dailyDownloads': '.daily-downloads',
        'weeklyDownloads': '.weekly-downloads',
        'monthlyDownloads': '.monthly-downloads'
      }, cb);
    },
    github: (cb) => {
      Scraping.multipleItem(mod, siteTypes.github, {
        'stars': '.js-social-count',
        'forks': '.pagehead-actions li:nth-child(3) a.social-count'
      }, cb);
    }
  }, (err, results) => {
    if (err) {
      return eachCb(err);
    }

    output.npm.add(results.npm);
    output.github.add(results.github);

    eachCb();
  });
}, function(err) {
  if (err) {
    console.log('error')
  } else{
    console.dir(output, { depth: null })
  }
});
