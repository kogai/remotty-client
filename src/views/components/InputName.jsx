import React from 'react';
import store from 'store';
import validator from 'validator';

import { updateProfile } from 'src/views/actions/OwnIconAction';

class InputName extends React.Component{
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.putProfile = this.putProfile.bind(this);
    this.state = {
      inputName: '',
      isValidName: false,
      isShow: false
    };
  }

  componentDidMount(){
    this.setState({
      isShow: true
    });
  }

  onChange(event){
    const inputValue = event.target.value;
    const isValid = validator.isByteLength(inputValue, 1);

    this.setState({
      inputName: event.target.value,
      isValidName: isValid
    });
  }

  putProfile(){
    updateProfile({
      name: this.state.inputName
    });
  }

  render(){
    const uri = "/member/" + store.get('own_token');

    let formClassName = 'form--hidden';
    if(this.state.isShow){
      formClassName = 'form';
    }

    let PutButton;
    if(this.state.isValidName){
      PutButton = <button className="form__item button--active" onClick={ this.putProfile }>編集する</button>;
    }else{
      PutButton = <button className="form__item button--disabled" >編集する</button>;
    }

    return(
      <article className={ formClassName + " members__paragraph" }>
        <input
          className="form__item input"
          type="text" placeholder="名前を入力して下さい"
          onChange={ this.onChange }
          value={ this.state.inputName } />
        { PutButton }
      </article>
    );
  }
}

export default InputName;
