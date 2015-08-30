import React from 'react';

import TeamStore from 'src/views/stores/TeamStore';
import TeamAction from 'src/views/actions/TeamAction';

import SelectList from './SelectList.jsx';

class Team extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			teams: []
		};
	}

	componentDidMount(){
		TeamStore.listen(()=>{
			return this.setState({
				teams: TeamStore.getState().teams
			});
		});
		TeamAction.getTeams();
	}

	render(){
    var selectables = this.state.teams;
		return (
      <article className="members__paragraph">
        <h1 className="members__title">チーム: { selectables[0] }</h1>
				<SelectList selectables={ selectables } onSelect={ TeamAction.changeSelect }/>
      </article>
		);
	}
}

export default Team;
