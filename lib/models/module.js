const Site = require('./site');
const StatSet = require('./statset');
const siteTypes = require('../constants').types.siteTypes;

class Module {
  constructor(name, params) {
    this.name = name;
    this.sites = {
      npm: new Site(name, siteTypes.npm),
      github: new Site(name, siteTypes.github)
    }
  }

  addSite(url, type) {
    this.sites[type].url = url;
  }
}

module.exports = Module;
