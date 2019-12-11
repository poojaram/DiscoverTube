import React, { Component } from 'react';
import './SignUpPageStyle.css';
import {NavLink} from 'react-router-dom';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
      'avatar': ''
    }; 
  }

  handleChange = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  handleSignUp = (event) => {
    event.preventDefault();
    let avatar = this.state.avatar || 'img/test.png';
    this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar);
  }

  render() {
    return (
      <form>
        <h1 className='form-title'>Sign Up</h1>
        <div className='input-group'>
          <label className='input-title' htmlFor='email'>Email</label>
          <input className='signup-input'  
            id='email' 
            type='email' 
            name='email'
            onChange={this.handleChange}
            />
        </div>
        
        <div className='input-group'>
          <label className='input-title' htmlFor='password'>Password</label>
          <input className='signup-input'
            id='password' 
            type='password'
            name='password'
            onChange={this.handleChange}
            />
        </div>

        <div className='input-group'>
          <label className='input-title' htmlFor='handle'>Handle</label>
          <input className='signup-input'  
            id='handle' 
            name='handle'
            onChange={this.handleChange}
            />
        </div>

        <div className='input-group'>
          <label className='input-title' htmlFor='avatar'>Avatar Image URL</label>
          <input className='signup-input'  
            id='avatar' 
            name='avatar' 
            placeholder='http://www.example.com/my-picture.jpg' 
            onChange={this.handleChange}
            />
            <img className='avatar' src={this.state.avatar || '../img/test.png'} alt='avatar preview' />
        </div>
        
        <div className='input-group'>
          <NavLink exact to="/">
            <button className='confirm-btn' onClick={this.handleSignUp}>Sign Up</button>
          </NavLink>
        </div>
      </form>
    )
  }
}

export default SignUpForm