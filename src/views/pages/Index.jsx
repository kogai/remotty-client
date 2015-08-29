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

		/*
		userState.allowVideo(function(err, localMediaStream){
			if(err){
				return console.log(err);
			}

			var video = document.querySelector('video');
			var url = window.URL.createObjectURL(localMediaStream);
			video.src = url;
			video.play();

			video.onloadedmetadata = function(e) {
				setInterval( () => {
					var imgURL = userState.takePhoto(video);
					var img = document.querySelector('img');
					img.src = imgURL;
				}, 1000);
			};

		});
		*/
		
		userState.allowLocate((error, position) => {
			if(error) return console.log(error);

			userState.analizeArea({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}, (err, results) => {
				if(err){
					return console.log(err);
				}
				console.log(results);
			});
		});
	}

	render(){
		return (
			<div>
				<img />
				<video style={ styles }></video>
			</div>
		);
	}
}

export default Index;
