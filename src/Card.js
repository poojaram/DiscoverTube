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

class Card extends Component {
    render() {
        let cardName = this.props.title;
        return(
            <div className="flex-item card">
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
      let cards = [];
      
      for(let i = 0; i < cardNames.length; i++) {
        cards[i] = <Card title={cardNames[i]} />
      }
  
      return(
        <section id="watch">
            <div class="flex-container">
            {cards}
            </div>
        </section>
      );
    }
  }