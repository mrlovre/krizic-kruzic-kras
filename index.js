var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/site.css', function(req, res) {
  res.sendFile(__dirname + '/site.css');
});

app.get('/scripts.js', function(req, res) {
  res.sendFile(__dirname + '/scripts.js');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});