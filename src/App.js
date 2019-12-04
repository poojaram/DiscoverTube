import React from 'react';
import {Component} from 'react';
import {CardList} from './Card.js'
import {newCardNames} from './Card.js';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Title />
        <CardList cardNames={newCardNames} />
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
            <p>DiscoverTube allows you to quickly find <span className="bold">never before seen</span> YouTube videos related to your
                interests. Specifically DiscoverTube finds YouTube videos with zero views in the category
                of your choice.</p>

            <h3>Simple to Use</h3>
            <p>With <span className="bold">just a few clicks</span> you can find and watch any and every unwatched YouTube video.
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
          <ul>
            <li aria-label="email">
              <a className="social-link" href="mailto:willrod@uw.edu"><i className="fa fa-envelope" aria-hidden="true"></i></a>
            </li>
            <li aria-label="facebook">
              <a className="social-link" target="_blank" href="https://www.facebook.com"><i className="fa fa-facebook" aria-hidden="true"></i></a>
            </li>
            <li aria-label="twitter">
              <a className="social-link" target="_blank" href="https://twitter.com"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
          </ul>
        </address>
        <p>&copy; 2019 DiscoverTube</p>
      </footer>
    );
  }
}