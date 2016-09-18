var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentPlayar;
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/css', express.static(__dirname + '/css'));

app.use('/js', express.static(__dirname + '/js'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  socket.on('play', function (msg) {
    if (currentPlayar !== msg.playar && !state[msg.field - 1]) {
      state[msg.field - 1] = msg.playar;
      io.emit('play-confirmed', msg);
      console.log(msg.playar + ' plays ' + msg.field);
      currentPlayar = msg.playar;
    }
  });
});

var checkGameOver = function() {
  
}