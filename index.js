const Hapi = require('hapi');
const server = new Hapi.Server();
const welcomeController = require('./src/controllers/welcome.js');
const featuredController = require('./src/controllers/featured-vendor.js');
const vendorsController = require('./src/controllers/vendors.js');
const Util = require('./src/store/util.js');

server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    reply('HELLO WORLD');
  }
});

welcomeController.setupRoutes(server);
featuredController.setupRoutes(server);
vendorsController.setupRoutes(server);

Util.initAWS();

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
