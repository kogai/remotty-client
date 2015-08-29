"use babel";

import React from 'react';
import store from 'store';

import UserState from 'src/classes/UserState';

// import stores from 'statics/src/views/stores';
// import actions from 'statics/src/views/actions';
// import buttons from 'statics/src/views/components/buttons';
// import forms from 'statics/src/views/components/forms';

var styles = {
	height: "480px",
	width: "640px",
	"backgroundColor": "#aaa"
};

class Index extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let userState = new UserState({
			navigator: window.navigator
		});

		userState.allowVideo(function(err, localMediaStream){
			// /*
			var video = document.querySelector('video');
			var url = window.URL.createObjectURL(localMediaStream);
			video.src = url;
			video.play();

			video.onloadedmetadata = function(e) {
				console.log(e);
				var canvas = document.querySelector('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = 640;
				canvas.height = 480;

				setInterval( () => {
					// ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
			    ctx.drawImage(video, 0, 0, 640, 480, 0, 0, 640, 480);
			    // var dataURL = canvas.toDataURL('image/jpeg');
				}, 1000);
			};
			// */
		});
		userState.allowLocate((error, position) => {
			if(error) return console.log(error);
			console.log(position);
		});
	}

	render(){
		return (
			<div>
				<canvas />
				<video style={ styles }></video>
			</div>
		);
	}
}

export default Index;
