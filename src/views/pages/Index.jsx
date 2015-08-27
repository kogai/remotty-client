"use babel";

import React from 'react';
import store from 'store';

import UserState from 'src/classes/UserState';

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
		let userState = new UserState({
			navigator: window.navigator
		});

		userState.allowVideo(function(err, localMediaStream){
			/*
			var video = document.querySelector('video');
			var url = window.URL.createObjectURL(localMediaStream);
			video.src = url;
			video.play();

			video.onloadedmetadata = function(e) {
				// Do something with the video here.
				console.log(e);
			};
			*/
		});
	}

	render(){
		return (
			<div>
				Hello, JSX!
				<video style={ styles }></video>
			</div>
		);
	}
}

export default Index;
