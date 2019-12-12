import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class WelcomePage extends Component {
    render() {
        if(this.props.currentUsername == 'Guest') {
            return(
                <header>
                    <Title />
                    <div className='div-buttons'>
                        <NavLink to="/signup">
                            <button className='signup-btn'>Sign Up</button>
                        </NavLink>
                        <NavLink to="/signin">
                            <button className='signin-btn'>Sign In</button>
                        </NavLink>
                    </div>
                </header>
            );
        } else {
            return(
                <header>
                    <Title />
                    <div className='div-buttons'>
                        <NavLink to="/watch">
                            <button className='signin-btn'>Watch</button>
                        </NavLink>
                        <NavLink to="/savedvideos">
                            <button className='signup-btn'>Library</button>
                        </NavLink>
                    </div>
                </header>
            );
        }
    }
}

class Title extends Component {
    render() {
      return(
        <div className="title">
            <h1>DiscoverTube</h1>
            <p className="sub-title">Discover a world of unseen footage</p>
        </div>
      );
    }
}

export default WelcomePage;