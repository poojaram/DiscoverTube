import React from 'react';
import {Component} from 'react';
import {CardList} from './Pages/CardPage.js'
import {newCardNames} from './Pages/CardPage.js';
import {newCardImgLinks} from './Pages/CardPage.js';
import {Popup} from './Popup.js';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';
import LandingPage from './Pages/LandingPage.js';
import AboutPage from './Pages/AboutPage.js';
import SignupPage from './Pages/SignUpPage.js';
import SignInPage from './Pages/SignInPage.js';
import SavedVideosPage from './Pages/SavedVideos.js';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      popupDisplay: 'none',
      cardName: 'Music',
      loading: true
    };
  }

  handleSignUp = (email, password, handle, avatar) => {
    this.setState({errorMessage:null});

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        let user = userCredentials.user;
        return user.updateProfile({
          displayName: handle,
          photoURL: avatar
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message
        });
      });
  }

  handleSignIn = (email, password) => {
    this.setState({errorMessage:null});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.setState({
          errorMessage: error.message
        });
      })
  }

  handleSignOut = () => {
    this.setState({errorMessage:null});

    firebase.auth().signOut();
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

  componentDidMount() {
    this.authUnRedFunc = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          user: user,
          loading: false
        });
      } else {
        this.setState({
          user: null,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.authUnRedFunc();
  }

  render() {
    let renderCardList = () => {
      return <CardList cardNames={newCardNames} imgLinks={newCardImgLinks} open={this.openPopup} />;
    };

    let renderSignupPage = () => {
      return <SignupPage signUpCallback={this.handleSignUp} />;
    };

    let renderUsername = () => {
      if(this.state.user) {
        console.log(this.state.user.displayName);
        return this.state.user.displayName;
      } else {
        return 'Guest';
      }
    };

    let renderSignInPage = () => {
      return <SignInPage signInCallback={this.handleSignIn} />
    };

    let renderSavedVideosPage = () => {
      return <SavedVideosPage currentUsername={renderUsername} />
    };

    return (
      <div className="App">
        <Popup close={this.closePopup} popupDisplay={this.state.popupDisplay} cardName={this.state.cardName} currentUsername={renderUsername()} />
        <Navbar currentUsername={renderUsername()} signoutCallback={this.handleSignOut} />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/watch' component={renderCardList} />
          <Route path='/about' component={AboutPage} />
          <Route path='/signup' render={renderSignupPage} />
          <Route path='/signin' render={renderSignInPage} />
          <Route path='/savedvideos' render={renderSavedVideosPage} />
          <Redirect to='/' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    let renderSignOutButton = () => {
      if(this.props.currentUsername != 'Guest') {
        return <button className='signout-btn' onClick={this.props.signoutCallback}>Sign Out</button>;
      } else {
        return null;
      }
    };

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
                    <li className='username'>
                      <p>{this.props.currentUsername}</p>
                      {renderSignOutButton()}
                    </li>
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