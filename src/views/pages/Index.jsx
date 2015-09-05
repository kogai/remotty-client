"use babel";

import React from 'react';
import store from 'store';

import UserState from 'src/views/classes/UserState';
import { connection } from 'src/views/classes/Database';

import MemberList from 'src/views/components/MemberList.jsx';
import Team from 'src/views/components/Team.jsx';
import Map from 'src/views/components/Map.jsx';

class Index extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
	}

	render(){
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
