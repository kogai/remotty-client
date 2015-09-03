"use babel";

import React from 'react';
import store from 'store';

import UserState from 'src/views/classes/UserState';
import { connection } from 'src/views/classes/Database';

import MemberList from 'src/views/components/MemberList.jsx';
// import MemberListContainer from 'src/views/container/MemberListContainer.jsx';
import Team from 'src/views/components/Team.jsx';
import Map from 'src/views/components/Map.jsx';

// import { connection } from '../models/IDB';

// import stores from 'statics/src/views/stores';
// import actions from 'statics/src/views/actions';
// import buttons from 'statics/src/views/components/buttons';
// import forms from 'statics/src/views/components/forms';

class Index extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
	}

	render(){
				// <img />
				// <video style={ styles }></video>
		return (
		<div className="container">
			<section className="members">
				<Team />
				<MemberList />
			</section>
			<Map />
		</div>
		);
	}
}

export default Index;
