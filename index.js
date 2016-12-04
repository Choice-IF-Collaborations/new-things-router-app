"use strict";

// REQUIRES
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// CONFIG
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use('/public', express.static(path.join(__dirname, 'public')));

// ROUTES
// Render the app view
app.get('/', function(req, res) {
	res.render('index');
});

// SOCKET.IO
io.on('connection', function (socket) {
});

server.on('message', function(message) {
  let payload = JSON.parse(String(message));

	io.sockets.emit('payload', payload);
});

// SERVER
http.listen(app.get('port'), function() {
	console.log("Server started on :" + app.get('port'));
});

server.bind(5005);
