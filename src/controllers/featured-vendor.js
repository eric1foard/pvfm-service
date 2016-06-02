// WELCOME PANE CONTROLLER
const Joi = require('joi');
const featuredStore = require('../store/featuredStore.js');

const setupRoutes = (server) => {

  server.route({
    method: 'GET',
    path: '/api/featured',
    config: {
      handler: (request, reply) => {
        console.log('calling get from controller...');
        featuredStore.get()
        .then((text) => {
          console.log('back from get...');
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
    path: '/api/featured',
    config: {
      validate: {
        payload: Joi.object().keys({
          text: Joi.string().required(),
          youtubeId: Joi.string(),
          mediaType: Joi.string().required()
        })
      },
      handler: (request, reply) => {
        featuredStore.setProp(null, request.payload)
        .then((text) => {
          reply(text);
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
