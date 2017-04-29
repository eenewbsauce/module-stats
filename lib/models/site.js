const siteTypes = require('../constants').types.siteTypes;

class Site {
  constructor(name, type) {
    this.name = name;
    this.type = siteTypes[type];
  }
}

module.exports = Site;
