import React from 'react';
import MemberIcon from './MemberIcon.jsx';

class MemberList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
    var members = ['electron', 'atom', 'github'];
    var membersComponent = members.map((member, index)=>{
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
