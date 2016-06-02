const Util = require(`${__dirname}/util.js`);
const FEATURED_JSON_PATH = `${__dirname}/../json/featured.json`;

const get = () => {
  return Util.get(FEATURED_JSON_PATH);
};

const setProp = (key, value) => {
  return Util.setProp(FEATURED_JSON_PATH, key, value);
};

module.exports = {
  get,
  setProp
};
