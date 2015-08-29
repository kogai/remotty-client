"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var server = express();
var routes = require('./global/routes');

server.set('views', path.join(__dirname, 'public'));
server.set('view engine', 'jade');

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

server.use(routes);

module.exports = server;

if(false){
  server.listen(4444, function() {
  	console.log('Express server listening on port 4444');
  });
}
