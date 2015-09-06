import http from 'http';
import socket from 'socket.io';

import { log } from 'src/classes/Logger';

const server = http.createServer();
server.listen(8888 || process.env.NODE_ENV);
const io = socket.listen(server);

io.on('connection', (ws)=>{
  console.log('$(ws.client.id) connected.');

  ws.on('client-update', (data)=>{
    const own_token = data.own_token;
    const imgBlob = data.imgBlob;
    ws.broadcast.emit('server-update', {
      own_token: own_token,
      imgBlob: imgBlob
    });
  });

  ws.on('disconnect', ()=>{
    console.log('$(ws.client.id) disconnected.');
  });
});
