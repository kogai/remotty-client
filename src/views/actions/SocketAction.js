import store from 'store';
import io from 'socket.io-client';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

const socketOpts = { reconnectionAttempts: 3 };
const url = 'http://localhost:8888';
let socket = io(url, socketOpts);

export function socketConnect(){
	socket.on('connect', ()=>{
		console.log('connect');
	});

  socket.on('server-update', (data)=>{
		Dispatcher.dispatch({
			type: Constants.UPDATE_SOMEONE_IMG,
			body: data
		});
  });
}

export function socketUpdate(imgBlob){

	console.log("client-update");

  const update = {
    own_token: store.get('own_token'),
    imgBlob: imgBlob
  }
  socket.emit('client-update', update);
}
