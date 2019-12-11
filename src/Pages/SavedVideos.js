import React, {Component} from 'react';
import firebase from 'firebase/app';

class VideoGrid extends Component {
    constructor(props){
        super(props);

        this.state = {
            videoInfo: []
        };
    }
    
    componentDidMount() {
        console.log(this.props.currentUsername());
        this.videosRef = firebase.database().ref('likes' + this.props.currentUsername());
        this.videosRef.on('value', (snapshot) => {
          this.setState({
            videoInfo: snapshot.val()
          });
        });
    }

    render() {
        /* let videoCards = this.state.videoInfo.map((video) => {
            return <VideoThumbnail title={video.title} imgLink={video.videoImg.default.url} />
        }); */

        return(
            <div id='saved'>
                <h1>Saved Videos</h1>
            </div>
        );
    }
}

class VideoThumbnail extends Component {
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

export default VideoGrid;