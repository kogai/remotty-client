import React from 'react';
import SelectList from './SelectList.jsx';

class Team extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
    var selectables = ['electron', 'atom', 'github'];
		return (
      <article className="members__paragraph">
        <h1 className="members__title">チーム: electron</h1>
				<SelectList selectables={ selectables }/>
      </article>
		);
	}
}

export default Team;
