import React from 'react';

class SelectList extends React.Component {
	constructor(props){
		super(props);
		this.toggleSelectList = this.toggleSelectList.bind(this);
		this.state = {
			isSelectListOpen: false
		};
	}

	toggleSelectList(){
		this.setState({
			isSelectListOpen: !this.state.isSelectListOpen
		});
	}

	render(){
		let optionsStyle = {
			"display": "none"
		};

		let selectables = this.props.selectables;
		let options = selectables.map((selectable, index)=>{
			return <option value={ selectable } key={ index }>{ selectable }</option>
		});

		let dummyOptions = selectables.map((selectable, index)=>{
			return (
				<li className="select__options__option" key={ index }>{ selectable }</li>
			)
		});

		let selectListClassName, selectCurrentButtonClassName;
		if(this.state.isSelectListOpen){
			selectCurrentButtonClassName = 'select__current__button--active';
			selectListClassName = 'select__options--active';
		}else{
			selectCurrentButtonClassName = 'select__current__button';
			selectListClassName = 'select__options';
		}
		
		return (
			<div>
				<select style={ optionsStyle }>
					{ options}
				</select>
				<div className="select">
					<div className="select__current">
						<div className="select__current__input">{ selectables[0] }</div>
						<div className={ selectCurrentButtonClassName } onClick={ this.toggleSelectList }></div>
					</div>
					<ul className={ selectListClassName }>
						{ dummyOptions }
					</ul>
				</div>
			</div>
		);
	}
}

export default SelectList;
