import React from 'react';
import {Component} from 'react';

export let newCardNames = [ 'Film & Animation', 
                            'Music', 
                            'Pets & Animals', 
                            'Sports', 
                            'Gaming', 
                            'People & Blogs', 
                            'Comedy', 
                            'Entertainment', 
                            'Travel & Events', 
                            'Cars', 
                            'News & Politics', 
                            'How-to', 
                            'Education', 
                            'Science & Technology', 
                            'Nonprofits & Activism'];

export let newCardImgLinks =   ['../img/film2.jpg', 
                                '../img/music.jpg', 
                                '../img/pets_2.png', 
                                '../img/sports.jpg', 
                                '../img/gaming.jpg', 
                                '../img/people.jpg', 
                                '../img/comedy.jpg', 
                                '../img/entertainment.jpg', 
                                '../img/travel.jpg', 
                                '../img/autos.jpg', 
                                '../img/news.jpg', 
                                '../img/howto.jpg', 
                                '../img/education.jpg', 
                                '../img/science.jpg', 
                                '../img/activism.jpg'];

class Card extends Component {
    handleClick = () => {
        this.props.open(this.props.title);
    }
    
    render() {
        let cardName = this.props.title;
        let imgLink = this.props.imgLink;
        
        const style = {
            backgroundImage: 'url(' + imgLink + ')'
        };

        return(
            <div className="flex-item card" onClick={this.handleClick} style = {style}>
                <div className="card-title">
                    <h3>{cardName}</h3>
                </div>
            </div>
        );
    }
}

export class CardList extends Component {
    render() {
      let cardNames = this.props.cardNames;
      let cardImgLinks = this.props.imgLinks;
      let cards = [];
      
      for(let i = 0; i < cardNames.length; i++) {
        cards[i] = <Card key={i} title={cardNames[i]} imgLink={cardImgLinks[i]} open={this.props.open} />
      }
  
      return(
        <section id="watch">
            <h1>DiscoverTube</h1>
            <div className="flex-container">
                {cards}
            </div>
        </section>
      );
    }
}