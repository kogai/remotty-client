import io from 'socket.io-client';

export function connect(){
  const opts = { reconnectionAttempts: 3 };
  const url = 'http://localhost:8888';
	const socket = io(url, opts);

	socket.on('connect', ()=>{
    console.log('connect.');
	});

  socket.emit('member-update', { isEmit: true });
}
