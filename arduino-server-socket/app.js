const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.emit('public-key:sent', { publicKey: 'key' }); // send the key to the tcp socket

io.on('connection', socket => {
  console.log('client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`server is listening on port ${port}!`);
})