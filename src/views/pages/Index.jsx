"use babel";

import React from 'react';
import store from 'store';

import UserState from 'src/views/classes/UserState';
import { connection } from 'src/views/classes/Database';

import MemberList from 'src/views/components/MemberList.jsx';
import Team from 'src/views/components/Team.jsx';
import Map from 'src/views/components/Map.jsx';
import InputName from 'src/views/components/InputName.jsx';

import OwnIconStore from 'src/views/stores/OwnIconStore';

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showInputName: OwnIconStore.getState().isNameDefault
		};
	}

	componentDidMount(){
		OwnIconStore.listen(()=>{
			this.setState({
				showInputName: OwnIconStore.getState().isNameDefault
			});
		});
	}

	render(){
		let ShowInputName;
		if(this.state.showInputName){
			ShowInputName = <InputName />;
		}else{
			ShowInputName = null;
		}

		return (
		<div className="container">
			<section className="members">
				{ ShowInputName }
				<MemberList />
			</section>
			<Map />
		</div>
		);
	}
}

export default Index;
