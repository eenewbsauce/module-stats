const async = require('async');
const R = require('ramda');
const Module = require('./module');
const siteTypes = require('../constants').types.siteTypes;
const Scraping = require('../helpers').Scraping;

class StatSet {
  constructor() {
    this.modules = new Set()
    this.results = {
      npm: {},
      github: {}
    };
  }

  add(params) {
    let module = new Module(params.name)

    params.sites.forEach((site) => {
      module.addSite(site.url, site.type);
    })

    this.modules.add(module);
  }

  getAll() {
    let self = this;

    return new Promise((resolve, reject) => {
      async.each(self.modules, (mod, eachCb) => {
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
        }, (err, res) => {
          if (err) {
            return eachCb(err);
          }

          Object.assign(self.results.npm, res.npm);
          Object.assign(self.results.github, res.github);

          eachCb();
        });
      }, function(err) {
        if (err) {
          console.dir(err)
        } else {
          let groupedOutput = {};

          R.keys(self.results).forEach((outerKey) => {
            R.keys(self.results[outerKey]).forEach((key) => {
              if (!groupedOutput.hasOwnProperty(key)) {
                groupedOutput[key] = {}
              }

              Object.assign(groupedOutput[key], self.results[outerKey][key]);
            });
          });

          resolve(groupedOutput);
        }
      });
    });
  }
}

module.exports = StatSet;
