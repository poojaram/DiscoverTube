import React from 'react';
import YouTube from 'react-youtube';
import {Component} from 'react';

const VIDEO_BATCH_AMOUNT = 1;
const API_KEY = /* 'AIzaSyD86p8C2PzxAfn6vGysciDbUW9Hg_Q3ang'; */
                   'AIzaSyBy50_Fpj1Q9vbPgw4vQmdSj_Lf9RtHmbc';
const FIND_VIDEO = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + VIDEO_BATCH_AMOUNT + '&type=video&videoEmbeddable=true&order=date&key=' + API_KEY;
const GET_VIEW_COUNT = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&maxResults=' + VIDEO_BATCH_AMOUNT + '&key=' + API_KEY;

let videoCategoryIds = [{'name':'Film & Animation', 'id':1}, 
                        {'name':'Music', 'id':10}, 
                        {'name':'Pets & Animals', 'id':15}, 
                        {'name':'Sports', 'id':17}, 
                        {'name':'Gaming', 'id':20}, 
                        {'name':'People & Blogs', 'id':22}, 
                        {'name':'Comedy', 'id':23}, 
                        {'name':'Entertainment', 'id':24}, 
                        {'name':'Travel & Events', 'id':19}, 
                        {'name':'Cars', 'id':2}, 
                        {'name':'News & Politics', 'id':25}, 
                        {'name':'How-to', 'id':26}, 
                        {'name':'Education', 'id':27}, 
                        {'name':'Science & Technology', 'id':28}, 
                        {'name':'Nonprofits & Activism', 'id':29}];

export class Popup extends Component {
    render() {
        let focusStyle = {display: this.props.popupDisplay};
        let containerStyle = {width: "100%", height: "100%"};
        return(
            <div className="focus" style={focusStyle}>
                <div className="flex-container" style={containerStyle}>
                    <Player close={this.props.close} cardName={this.props.cardName} showing={(this.props.popupDisplay == 'block')} />
                </div>
            </div>
        );
    }
}

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nextPage: '',
            videoId: '',
            loading: true
        };
    }

    getIdFromCategoryName = (categoryName) => {
        for(let i = 0; i < videoCategoryIds.length; i++) {
            if(videoCategoryIds[i].name == categoryName) {
                return videoCategoryIds[i].id;
            }
        }
    
        return -1;
    }

    getNewVideo = () => {
        this.setState({loading: true});
        fetch(FIND_VIDEO + '&pageToken=' + this.state.nextPage)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    nextPage: data.nextPageToken,
                    videoId: data.items[0].id.videoId,
                    loading: false
                });
            });
    }
    
    componentDidMount() {
        fetch(FIND_VIDEO + '&videoCategoryId=' + this.getIdFromCategoryName(this.props.cardName))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    nextPage: data.nextPageToken,
                    videoId: data.items[0].id.videoId,
                    loading: false
                });
            })
            .catch((err) => {
                console.log(err);
            }); 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.cardName != prevProps.cardName) {
            this.setState({loading: true});
            fetch(FIND_VIDEO + '&videoCategoryId=' + this.getIdFromCategoryName(this.props.cardName))
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    this.setState({
                        nextPage: data.nextPageToken,
                        videoId: data.items[0].id.videoId,
                        loading: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <div>
                    <div className="flex-item" id="player">
                        <div>LOADING</div>
                    </div>
                    <button className="new-vid" onClick={this.getNewVideo}>New Video</button>
                    <button className="close-vid" onClick={this.props.close}>Close</button>
                </div>
            );
        } else {
            return(
                <div>
                    <div className="flex-item" id="player">
                        <Video height={303} width={640} videoId={this.state.videoId} showing={this.props.showing} />
                    </div>
                    <button className="new-vid" onClick={this.getNewVideo}>New Video</button>
                    <button className="close-vid" onClick={this.props.close}>Close</button>
                </div>
            );
        }
    }
}

class Video extends Component {
    whenReady(event) {
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }

    render() {
        const opts = {
          height: this.props.height,
          width: this.props.width,
          playerVars: {
            autoplay: 1
          }
        };
        
        if(this.props.showing) {
            return (
                <YouTube videoId={this.props.videoId} opts={opts} onReady={this.whenReady} />
            );
        } else {
            return(
                <div></div>
            );
        }
        
      }
}