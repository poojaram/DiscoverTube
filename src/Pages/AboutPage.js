import React, {Component} from 'react';

class Description extends Component {
    render() {
      return(
        <section id="descr">
          <div className="container">
            <h1>About DiscoverTube</h1>
            <p>Discover a world of unseen footage with <span className="bold">DiscoverTube</span>. Watch never
                before seen videos from YouTube and be the first in the entire world to ever watch them!</p>
  
            <h2>What is DiscoverTube?</h2>
            <p>DiscoverTube allows you to quickly find YouTube videos that almost no one <span className="bold">has ever seen</span> related to your
                interests. Specifically DiscoverTube finds YouTube videos with minimal views in the category of your choice.</p>
  
            <h2>Simple to Use</h2>
            <p>With <span className="bold">just a few clicks</span> you can find and watch any and every barely seen YouTube video.
                Finding new content has never been easier.</p>
  
            <h2>Be the Very First</h2>
            <p>Be the first to ever watch a video and potentially <span className="bold">discover something amazing</span>. Discover
                something
                new right now!</p>
            </div>
        </section>
      );
    }
  }

  export default Description;