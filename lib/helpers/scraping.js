const crawl = require('osmosis');
const async = require('async');
const R = require('ramda');

class Scraping {
  constructor() {}

  static multipleItem(mod, type, selectorKeys, cb) {
     let fnArr = R.keys(selectorKeys).map((key) => {
       return this.singleItem.bind(
        this,
        mod,
        type,
        selectorKeys[key],
        key
      )
    });

    async.parallel(
      fnArr
    ,(err, results) => {
      if (err) {
        console.log('error in multipleItem')

        return cb();
      }

      let groupedResults = R.compose(
        (merged) => {
          return {
            [mod.name]: merged
          };
        },
        R.mergeAll,
        (results) => {
          return R.map((item) => (item[mod.name]), results)
        },
        R.filter((item) => (!R.isNil(item)))
      )
      (results);

      cb(null, groupedResults);
    });
  }

  static singleItem(mod, type, selector, key, cb) {
    console.log(`processing ${mod.name} for ${type} for ${key} with ${selector}`);

    crawl
      .get(mod.sites[type].url)
      .find(selector)
      .set(key)
      .data((data) => {
        console.log(`data found for ${mod.name}: ${type}`)

        return cb(null, { [mod.name]: data });
      })
      .error((err) => {
        console.log(`error found for ${mod.name}: ${type}`)

        return cb()
      })
  }
}

module.exports = Scraping;
