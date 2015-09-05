import React from 'react';
import store from 'store';

import UserState from 'src/views/classes/UserState';
import { snapshot } from 'src/views/classes/SnapShot';
import config from 'src/views/config';
import { updatePhoto, getOwnName } from 'src/views/actions/OwnIconAction';
import OwnIconStore from 'src/views/stores/OwnIconStore';

const userState = new UserState({ navigator: window.navigator });

class OwnIcon extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imgURL: OwnIconStore.getState().imgURL,
			name: OwnIconStore.getState().name
		};

		this.keepUpdateImgURL = this.keepUpdateImgURL.bind(this);
		this.listenUpdateOwnName = this.listenUpdateOwnName.bind(this);
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

		this.listenUpdateOwnName();
		getOwnName(store.get('own_token'));
	}

	listenUpdateOwnName(){
		OwnIconStore.listen(()=>{
			this.setState({
				name: OwnIconStore.getState().name
			});
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
        <span className="icon__name">{ this.state.name }</span>
      </li>
		);
	}
}

export default OwnIcon;
