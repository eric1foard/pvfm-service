const Util = require(`${__dirname}/util.js`);
const VENDOR_JSON_PATH = `${__dirname}/../json/vendors.json`;

const get = () => {
  return Util.get(VENDOR_JSON_PATH);
};

const setProp = (key, value) => {
  return Util.setProp(VENDOR_JSON_PATH, key, value);
};

module.exports = {
  get,
  setProp
};
