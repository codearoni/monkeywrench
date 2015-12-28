console.log(process.version);
var fs = require('fs'),
    path = require('path'),
    Hapi = require('hapi'),
    server = new Hapi.Server(),
    extensionPath = '';

server.connection({ port: 14416 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'POST',
    path: '/init',
    handler: function (request, reply) {
        extensionPath = request.payload.extension;
        reply('Initialization complete');
    }
});

server.route({
  method: 'GET',
  path: '/scripts',
  handler: function (request, reply) {
      getScripts(function (files) {
          reply(files);
      });
  }
});

server.route({
  method: 'POST',
  path: '/run',
  handler: function (request, reply) {
      getFile(request.payload.name, function (file) {
          reply(file);
      });
  }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

function getScripts (cb) {
  fs.readdir(path.join(extensionPath, 'scripts'), function (err, files) {
      if (err) {
        console.log(err);
      } else {
        cb(files);
      }
  });
}

function getFile (name, cb) {
      fs.readFile(path.join(extensionPath, 'scripts', name), 'utf8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            cb(data);
          }
      });
}
