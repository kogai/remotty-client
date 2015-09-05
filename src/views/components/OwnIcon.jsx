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
		this.state = OwnIconStore.getState();

		this.listenStore = this.listenStore.bind(this);
		this.updateImgURL = this.updateImgURL.bind(this);
	}

	componentDidMount(){
		snapshot
		.allowVideo()
		.then((video)=>{
			snapshot.start(video, (imgURL)=>{
				updatePhoto(imgURL);
			})
		});

		this.listenStore();
		getOwnName(store.get('own_token'));
	}

	listenStore(){
		OwnIconStore.listen(()=>{
			this.setState(OwnIconStore.getState());
		});
	}

	updateImgURL(){
		const imgURL = snapshot.takePhoto(snapshot.video);
		updatePhoto(imgURL);
	}

	render(){
		return (
			<li className="members__list__icon--active icon">
        <img src={ this.state.imgURL } className="icon__img" onClick={ this.updateImgURL } />
				<span className="icon__name">{ this.state.name }</span>
      </li>
		);
	}
}

export default OwnIcon;
