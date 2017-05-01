# module-stats
A web crawler that collects stats from NPM and Github

## Usage

```javascript
const nodeModuleStats = require('node-module-stats');
const StatSet = nodeModuleStats.models.StatSet;
const siteTypes = nodeModuleStats.constants.types.siteTypes;

let stats = new StatSet();

stats.add({
  name: 'circleImage',
  sites: [{
    url: 'www.npmjs.com/package/circle-image',
    type: siteTypes.npm
  }, {
    url: 'github.com/eenewbsauce/circle-image',
    type: siteTypes.github
  }]
});

return stats.getAll()
  .then((stats) => {
    ctx.body = stats;
  });
```
