import React from 'react';

import MemberIcon from './MemberIcon.jsx';
import UserState from 'src/classes/UserState';

import MemberAction from 'src/views/actions/MemberAction';
import MemberStore from 'src/views/stores/MemberStore';

let userState = new UserState({ navigator: window.navigator });

class MemberList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			members: []
		};
	}

	componentDidMount(){
		MemberAction.getMembers();
		MemberStore.listen(()=>{
			return this.setState({
				members: MemberStore.getState().members
			});
		});
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
    var membersComponent = this.state.members.map((member, index)=>{
      return (
        <MemberIcon
          name={ member }
          img="/images/icon.png"
          key={ index }
        />
      );
    });

		return (
      <article className="members__paragraph">
        <h2 className="members__title--with-list">チームのメンバー</h2>
        <ul className="members__list">{ membersComponent }</ul>
      </article>
    );
	}
}

export default MemberList;
