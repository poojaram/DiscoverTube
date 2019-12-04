import React from 'react';
import {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Title />
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
        <div class="navbar">
            <input type="checkbox" id="menu"></input>
            <label for="menu"><i class="fa fa-bars" aria-hidden="true"></i></label>
            <div class="navbar-content">
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
          <div class="title">
              <h1>DiscoverTube</h1>
              <p class="sub-title">Discover a world of unseen footage</p>
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
        <div class="container">
            <h2>About DiscoverTube</h2>
            <p>Discover a world of unseen footage with <span class="bold">DiscoverTube</span>. Watch never
                before seen videos from YouTube and be the first in the entire world to ever watch them!</p>

            <h3>What is DiscoverTube?</h3>
            <p>DiscoverTube allows you to quickly find <span class="bold">never before seen</span> YouTube videos related to your
                interests. Specifically DiscoverTube finds YouTube videos with zero views in the category
                of your choice.</p>

            <h3>Simple to Use</h3>
            <p>With <span class="bold">just a few clicks</span> you can find and watch any and every unwatched YouTube video.
                Finding new content has never been easier.</p>

            <h3>Be the Very First</h3>
            <p>Be the first to ever watch a video and potentially <span class="bold">discover something amazing</span>. Discover
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
              <a class="social-link" href="mailto:willrod@uw.edu"><i class="fa fa-envelope" aria-hidden="true"></i></a>
            </li>
            <li aria-label="facebook">
              <a class="social-link" target="_blank" href="https://www.facebook.com"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            </li>
            <li aria-label="twitter">
              <a class="social-link" target="_blank" href="https://twitter.com"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
          </ul>
        </address>
        <p>&copy; 2019 DiscoverTube</p>
      </footer>
    );
  }
}