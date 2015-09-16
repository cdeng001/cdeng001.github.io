var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// routing
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use("/images", express.static(__dirname + '/images'));
app.use("/characters", express.static(__dirname + '/characters'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

io.sockets.on('connection', function (socket) {

    socket.on('submit_team', function (data) {
        console.log(data);
        //io.sockets.in(socket.room).emit('update_team', socket.username, data);
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
