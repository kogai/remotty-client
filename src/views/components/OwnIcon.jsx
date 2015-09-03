import React from 'react';

import UserState from 'src/views/classes/UserState';
import { snapshot } from 'src/views/classes/SnapShot';
import config from 'src/views/config';

const userState = new UserState({ navigator: window.navigator });

class OwnIcon extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imgURL: '/images/icon.png'
		};
	}

	componentDidMount(){
		snapshot
		.allowVideo()
		.then((video)=>{
			snapshot.start(video, ()=>{
				/**
				* ここにActionへの伝播処理を書く
				*/
				console.log('snapshot taked.');
			})
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
