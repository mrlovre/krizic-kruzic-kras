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
    checkGameOver();
  });
  socket.on('reset-game', resetGame);
});

var checkGameOver = function () {
  var winner = null;
  for (var i = 0; i < 3; i++) {
    winner = hasWinner(row(i));
    if (winner) break;
    winner = hasWiner(column(i));
    if (winner) break;
  }
  for (var i = 0; i < 2; i++) {
    winner = hasWinner(diagonal(i));
    if (winner) break;
  }
  if (winner || full()) {
    io.emit('gameover', { winner: winner });
  }
}

var hasWinner = function (fields) {
  if (!fields[0] && fields[0] === fields[1] && fields[1] === fields[2]) {
    return fields[0];
  } else {
    return null;
  }
}

// Rov
var row = function (i) {
  return [state[3 * i], state[3 * i + 1], state[3 * i + 2]];
}

//Kolumna
var column = function (i) {
  return [state[i], state[i + 3], state[i + 6]];
}

//Diagonala /
var diagonal = function (i) {
  if (i === 0) return [state[2], state[4], state[6]];
  return [state[0], state[3], state[6]];
}

var resetGame = function () {
  state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  currentPlayar = null;
}
