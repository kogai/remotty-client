import http from 'http';
import socket from 'socket.io';

const server = http.createServer();
server.listen(8888 || process.env.NODE_ENV);
const io = socket.listen(server);

io.on('connection', (client)=>{
  client.on('member-update', (data)=>{
    console.log(data);
  });
});
