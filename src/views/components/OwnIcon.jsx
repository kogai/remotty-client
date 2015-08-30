import React from 'react';

class OwnIcon extends React.Component {
	constructor(props){
		super(props);
	}

	// componentDidMount(){
	// 	userState.allowVideo(function(err, localMediaStream){
	// 		if(err){
	// 			return console.log(err);
	// 		}
	// 		/*
	// 		var video = document.querySelector('video');
	// 		var url = window.URL.createObjectURL(localMediaStream);
	// 		video.src = url;
	// 		video.play();
	//
	// 		video.onloadedmetadata = function(e) {
	// 			setInterval( () => {
	// 				var imgURL = userState.takePhoto(video);
	// 				var img = document.querySelector('img');
	// 				img.src = imgURL;
	// 			}, 1000);
	// 		};
	// 		*/
	// 	});
	// }

	render(){
		return (
			<li className="members__list__icon--active icon">
        <img src={ this.props.img } alt={ "this.props.name" } className="icon__img" />
        <span className="icon__name">{ "this.props.name" }</span>
      </li>
		);
	}
}

export default OwnIcon;
