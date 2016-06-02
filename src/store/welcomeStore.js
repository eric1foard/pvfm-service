const Util = require(`${__dirname}/util.js`);
const WELCOME_JSON_PATH = `${__dirname}/../json/welcome.json`;

const get = () => {
  return Util.get(WELCOME_JSON_PATH);
};

const setProp = (key, value) => {
  return Util.setProp(WELCOME_JSON_PATH, key, value);
};

module.exports = {
  get,
  setProp
};
