import React from 'react';
import UserState from 'src/classes/UserState';
import config from 'src/views/config';

const userState = new UserState({ navigator: window.navigator });

class OwnIcon extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imgURL: '/images/icon.png'
		}
	}

	componentDidMount(){
		const _self = this;
		userState.allowVideo(function(err, localMediaStream){
			if(err){
				return console.log(err);
			}

			const video = document.createElement('video');
			const videoURL = window.URL.createObjectURL(localMediaStream);
			video.src = videoURL;
			video.play();

			video.onloadedmetadata = function(e) {
				setInterval( () => {
					const imgURL = userState.takePhoto(video);
					_self.setState({
						imgURL: imgURL
					});
				}, config.snapInterval);
			};
		});
	}

	render(){
		return (
			<li className="members__list__icon--active icon">
        <img src={ this.state.imgURL } className="icon__img" />
        <span className="icon__name">{ "this.props.name" }</span>
      </li>
		);
	}
}

export default OwnIcon;
