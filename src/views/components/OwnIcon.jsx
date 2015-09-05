import React from 'react';

import UserState from 'src/views/classes/UserState';
import { snapshot } from 'src/views/classes/SnapShot';
import config from 'src/views/config';
import { updatePhoto, getMe } from 'src/views/actions/OwnIconAction';
import OwnIconStore from 'src/views/stores/OwnIconStore';

const userState = new UserState({ navigator: window.navigator });

class OwnIcon extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imgURL: OwnIconStore.getState().imgURL
		};
		this.keepUpdateImgURL = this.keepUpdateImgURL.bind(this);
		this.updateImgURL = this.updateImgURL.bind(this);
	}

	componentDidMount(){
		snapshot
		.allowVideo()
		.then((video)=>{
			snapshot.start(video, (imgURL)=>{
				this.keepUpdateImgURL();
				updatePhoto(imgURL);
			})
		});
	}

	keepUpdateImgURL(){
		OwnIconStore.listen(()=>{
			this.setState({
				imgURL: OwnIconStore.getState().imgURL
			});
		});
	}

	updateImgURL(){
		const imgURL = snapshot.takePhoto(snapshot.video);
		updatePhoto(imgURL);
	}

	render(){
		return (
			<li className="members__list__icon--active icon" onClick={ this.updateImgURL }>
        <img src={ this.state.imgURL } className="icon__img" />
        <span className="icon__name">{ "this.props.name" }</span>
      </li>
		);
	}
}

export default OwnIcon;
