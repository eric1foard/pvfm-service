// WELCOME PANE CONTROLLER
const Joi = require('joi');
const vendorStore = require('../store/vendorStore.js');

const setupRoutes = (server) => {

  server.route({
    method: 'GET',
    path: '/api/vendors',
    config: {
      handler: (request, reply) => {
        vendorStore.get()
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
    path: '/api/vendors',
    config: {
      validate: {
        payload: Joi.object().pattern(/.*\S.*/, // match any string but not empty or just spaces
          Joi.object().keys({
            image: Joi.string().required(),
            selection: Joi.boolean().required(),
            vendors: Joi.array().items(Joi.string().required()) // vendor array must contain >= 1 string
          })
        )
      },
      handler: (request, reply) => {
        const key = Object.keys(request.payload).pop();
        const value = request.payload[key];
        vendorStore.setProp(key, value)
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
