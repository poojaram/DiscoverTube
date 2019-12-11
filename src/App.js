import React from 'react';
import {Component} from 'react';
import {CardList} from './Pages/CardPage.js'
import {newCardNames} from './Pages/CardPage.js';
import {newCardImgLinks} from './Pages/CardPage.js';
import {Popup} from './Popup.js';
import {Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';
import LandingPage from './Pages/LandingPage.js';
import AboutPage from './Pages/AboutPage';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      popupDisplay: 'none',
      cardName: 'Music'
    };
  }

  openPopup = (curCardName) => {
    let stateChanges = {
      popupDisplay: 'block',
      cardName: curCardName
    };

    this.setState(stateChanges);
  }

  closePopup = (event) => {
    let stateChanges = {
      popupDisplay: 'none'
    };

    this.setState(stateChanges);
  }


  render() {
    let renderCardList = () => {
      return <CardList cardNames={newCardNames} imgLinks={newCardImgLinks} open={this.openPopup} />;
    };

    return (
      <div className="App">
        <div className='body'>
          <Popup close={this.closePopup} popupDisplay={this.state.popupDisplay} cardName={this.state.cardName} />
          <Navbar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/watch' component={renderCardList} />
            <Route path='/about' component={AboutPage} />
            <Redirect to='/' />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return(
      <nav>
        <div className="navbar">
            <input type="checkbox" id="menu"></input>
            <label htmlFor="menu"><i className="fa fa-bars" aria-hidden="true"></i></label>
            <div className="navbar-content">
                <ul>
                    <li onClick={() => document.getElementById("menu").checked = false} ><NavLink exact to="/">Home</NavLink></li>
                    <li onClick={() => document.getElementById("menu").checked = false}><NavLink to="/watch">Watch</NavLink></li>
                    <li onClick={() => document.getElementById("menu").checked = false}><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </div>
    </nav>
    );
  }
}

class Footer extends Component {
  render() {
    return(
      <footer id="contact">
        <h3>Connect</h3>
        <address>
          <SocialLinkList />
        </address>
        <p>&copy; 2019 DiscoverTube</p>
      </footer>
    );
  }
}

class SocialLinkList extends Component {
  render() {
    return(
      <ul>
        <SocialLink linkType='email' link='mailto:willrod@uw.edu' icon='fa fa-envelope' />
        <SocialLink linkType='facebook' link='https://www.facebook.com' icon='fa fa-facebook' />
        <SocialLink linkType='twitter' link='https://twitter.com' icon='fa fa-twitter' />
      </ul>
    );
  }
}

class SocialLink extends Component {
  render() {
    let linkType = this.props.linkType;
    let link = this.props.link;
    let icon = this.props.icon;

    return(
      <li aria-label={linkType}>
        <a className="contact-link" target="_blank" href={link}>
          <i className={icon} aria-hidden="true"></i>
        </a>
      </li>
    );
  }
}