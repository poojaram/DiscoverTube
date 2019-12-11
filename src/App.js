import React from 'react';
import {Component} from 'react';
import {CardList} from './Card.js'
import {newCardNames} from './Card.js';
import {newCardImgLinks} from './Card.js';
import {Popup} from './Popup.js';

import SignUpForm from './components/signup/SignUpForm';
import firebase from 'firebase/app';

import ChirperHeader from './components/chirper/ChirperHeader.js';
import ChirpBox from './components/chirper/ChirpBox.js';
import ChirpList from './components/chirper/ChirpList.js';

require('firebase/auth');
require('firebase/analytics');


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCi-87qWZIwWFkt3o2LhqNv3NAfoiLm3XY",
  authDomain: "discovertube-cd88d.firebaseapp.com",
  databaseURL: "https://discovertube-cd88d.firebaseio.com",
  projectId: "discovertube-cd88d",
  storageBucket: "discovertube-cd88d.appspot.com",
  messagingSenderId: "969329114542",
  appId: "1:969329114542:web:15efef9124e83a7da11c3f",
  measurementId: "G-WCYMFVHMJ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {loading:true};
  }

  //A callback function for registering new users
  handleSignUp(email, password, handle, avatar) {
    
    this.setState({errorMessage:null});

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
     
      return firebase.auth().currentUser.updateProfile({
        displayName: handle,
        photoURL: avatar
      });
    }).catch((error) => {
      this.setState({errorMessage:error.message});
    });

  }

  //A callback function for logging in existing users
  handleSignIn(email, password) {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      this.setState({errorMessage:error.message});
    });
  }

  //A callback function for logging out the current user
  handleSignOut(){
    this.setState({errorMessage:null});

    firebase.auth().signOut().catch((error) => {
      this.setState({errorMessage:error.errorMessage});
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      
      // the page will "stop" loading once an authentication event has been received 
      this.setState({loading:false});

      if (firebaseUser) {
        this.setState({user:firebaseUser});
      }
      else {
        this.setState({user:null});
      }
    });

  }

  /* componentWillUnmount() {
    this.authUnRegFunc();
  } */

  render() {

    let content=null; //content to render

    if (this.state.loading) {
      return (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>);
    }

    if(!this.state.user) { // display signup form if logged out
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm 
            signUpCallback={(e,p,h,a) => this.handleSignUp(e,p,h,a)} 
            signInCallback={(e,p) => this.handleSignIn(e,p)} 
            />
        </div>
      );
    } 
    else { // show welcome message if logged in
      content = (
        <div>
          <ChirperHeader user={this.state.user}>
            {/* log out button is child element */}
            {this.state.user &&
              <button className="btn btn-warning" 
                      onClick={() => this.handleSignOut()}>
                Log Out {this.state.user.displayName}
              </button>
            }
          </ChirperHeader>
          <ChirpBox currentUser={this.state.user} />
          <ChirpList currentUser={this.state.user} />
          
          
        </div>
      );
    }

    return (
      <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
      </div>
    );
  }
}

//A component to display a welcome message to a `user` prop
class WelcomeHeader extends Component {
  render() {
    return (
      <header className="container">
        <h1>
          Welcome {this.props.user.displayName}!
          {' '}
          <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
        </h1>
        {this.props.children} {/* for button */}
      </header>
    );
  }
}

/* export default class App extends Component {
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
    return (
      <div className="App">
        <Popup close={this.closePopup} popupDisplay={this.state.popupDisplay} cardName={this.state.cardName} />
        <Navbar />
        <Title />
        <CardList cardNames={newCardNames} imgLinks={newCardImgLinks} open={this.openPopup} />
        <Description />
        <Footer />
      </div>
    );
  }
}
 */
class Navbar extends Component {
  render() {
    return(
      <nav>
        <div className="navbar">
            <input type="checkbox" id="menu"></input>
            <label htmlFor="menu"><i className="fa fa-bars" aria-hidden="true"></i></label>
            <div className="navbar-content">
                <ul>
                    <li><a href="#title">Home</a></li>
                    <li><a href="#watch">Watch</a></li>
                    <li><a href="#descr">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    );
  }
}

class Title extends Component {
  render() {
    return(
      <header>
        <section id="title">
          <div className="title">
              <h1>DiscoverTube</h1>
              <p className="sub-title">Discover a world of unseen footage</p>
          </div>
        </section>
      </header>
    );
  }
}

class Description extends Component {
  render() {
    return(
      <section id="descr">
        <div className="container">
          <h2>About DiscoverTube</h2>
          <p>Discover a world of unseen footage with <span className="bold">DiscoverTube</span>. Watch never
              before seen videos from YouTube and be the first in the entire world to ever watch them!</p>

          <h3>What is DiscoverTube?</h3>
          <p>DiscoverTube allows you to quickly find YouTube videos that almost no one <span className="bold">has ever seen</span> related to your
              interests. Specifically DiscoverTube finds YouTube videos with minimal views in the category of your choice.</p>

          <h3>Simple to Use</h3>
          <p>With <span className="bold">just a few clicks</span> you can find and watch any and every barely seen YouTube video.
              Finding new content has never been easier.</p>

          <h3>Be the Very First</h3>
          <p>Be the first to ever watch a video and potentially <span className="bold">discover something amazing</span>. Discover
              something
              new right now!</p>
          </div>
      </section>
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
