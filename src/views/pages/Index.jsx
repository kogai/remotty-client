"use babel";

import React from 'react';
import store from 'store';

// import stores from 'statics/src/views/stores';
// import actions from 'statics/src/views/actions';
// import buttons from 'statics/src/views/components/buttons';
// import forms from 'statics/src/views/components/forms';

var styles = {
	height: "400px",
	width: "1000px",
	"backgroundColor": "#aaa"
};

class Index extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		var constraints = {
			video: true
		};

		// MediaStreamTrack
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
		navigator.getUserMedia(constraints, function success(localMediaStream){
		  var videoTracks = localMediaStream.getVideoTracks();
			console.log(videoTracks);
		  console.log('Using video device: ' + videoTracks[0].label);
			// localMediaStream.addTrack();

			var video = document.querySelector('video');
			var url = window.URL.createObjectURL(localMediaStream);

			console.log(url);

			video.src = url;
			video.play();

			video.onloadedmetadata = function(e) {
				// Do something with the video here.
				console.log(e);
			};
		}, function fail(err){
			console.log(err);
		});
	}

	render(){
		return (
			<div>
				Hello, JSX!
				<video style={ styles } src="https://mizcan.mizbering.jp/movies/main.mp4"></video>
			</div>
		);
	}
}

export default Index;
