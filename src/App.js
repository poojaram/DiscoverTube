import React from 'react';
import {Component} from 'react';
import {CardList} from './Card.js'
import {newCardNames} from './Card.js';
import {newCardImgLinks} from './Card.js';
import {Popup} from './Popup.js';

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