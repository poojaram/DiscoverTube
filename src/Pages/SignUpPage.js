import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './SignUpPageStyle.css';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined
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
    this.props.signUpCallback(this.state.email, this.state.password, this.state.handle);
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
          <button className='signup-btn' onClick={this.handleSignUp}>Sign Up</button>
          <NavLink to="/signin">
            <button className='signin-btn'>Sign In</button>
          </NavLink>
        </div>
      </form>
    )
  }
}

export default SignUpForm