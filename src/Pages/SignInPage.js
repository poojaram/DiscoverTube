import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class SignInForm extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          'email': undefined,
          'password': undefined
        }; 
      }
    
    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;

        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    handleSignIn = (event) => {
        event.preventDefault();
        this.props.signInCallback(this.state.email, this.state.password);
    }
    
    render() {
        return(
            <form>
                <h1 className='form-title'>Sign In</h1>
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
                    <NavLink exact to="/">
                        <button className='confirm-btn' onClick={this.handleSignIn}>Sign In</button>
                    </NavLink>
                </div>
            </form>
        );
    }
}

export default SignInForm;