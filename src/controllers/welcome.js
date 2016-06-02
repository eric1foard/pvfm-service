// WELCOME PANE CONTROLLER
const Joi = require('joi');
const welcomeStore = require('../store/welcomeStore.js');
const Util = require('../store/util.js');
const fs = require('fs');

const setupRoutes = (server) => {

  server.route({
    method: 'GET',
    path: '/api/welcome',
    config: {
      handler: (request, reply) => {
        welcomeStore.get()
        .then((text) => {
          reply(text);
        })
        .catch((err) => {
          reply(err);
        });
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/api/welcome',
    config: {
      validate: {
        payload: Joi.object().keys({
          key: Joi.string().required(),
          value: Joi.string().required()
        })
      },
      handler: (request, reply) => {
        console.log('recieved request...', request);
        console.log('calling setProp from controller...');
        welcomeStore.setProp(request.payload.key, request.payload.value)
        .then((text) => {
          console.log('back from setProp...');
          reply(text);
        })
        .catch((err) => {
          reply(err);
        });
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/api/welcome/photo',
    config: {
      // validate: {
      //   payload: Joi.object().keys({
      //     key: Joi.string().required(),
      //     value: Joi.string().required()
      //   })
      // },
      handler: (request, reply) => {
        console.log('trying to upload photo...');
        Util.uploadPhoto('test', fs.readFileSync(`${__dirname}/../../test/cat.png`))
        .then((url) => {
          console.log('back from uploadPhoto...', url);
          reply(url);
        })
        .catch((err) => {
          reply(err);
        });
      }
    }
  });
};

module.exports = {
  setupRoutes
};
