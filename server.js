"use strict";

var path = require('path');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./global/routes');

var server = express();

server.set('views', path.join(__dirname, 'public'));
server.set('view engine', 'jade');

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

server.use(routes);

module.exports = server;
