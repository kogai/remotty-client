import React from 'react';

class MemberIcon extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<li className="members__list__icon icon">
        <img src={ this.props.img } alt={ this.props.name } className="icon__img" />
        <span className="icon__name">{ this.props.name }</span>
      </li>
		);
	}
}

export default MemberIcon;
