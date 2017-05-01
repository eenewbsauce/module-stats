# module-stats
A web crawler that collects stats from NPM and Github

## Usage

```javascript
const nodeModuleStats = require('node-module-stats');
const StatSet = nodeModuleStats.models.StatSet;
const siteTypes = nodeModuleStats.constants.types.siteTypes;

let stats = new StatSet();

stats.add({
  name: 'reactAddRedux',
  sites: [{
    url: 'www.npmjs.com/package/create-react-app-add-redux',
    type: siteTypes.npm
  }, {
    url: 'github.com/eenewbsauce/create-react-app-add-redux',
    type: siteTypes.github
  }]
});

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
    // reactAddRedux: {
    //   dailyDownloads: "9",
    //   weeklyDownloads: "120",
    //   monthlyDownloads: "207",
    //   stars: "6",
    //   forks: "2"
    // },
    // circleImage: {
    //   dailyDownloads: "44",
    //   weeklyDownloads: "91",
    //   monthlyDownloads: "503",
    //   stars: "3",
    //   forks: "3"
    // }
  });
```
