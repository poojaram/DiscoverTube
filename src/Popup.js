import React from 'react';
import YouTube from 'react-youtube';
import {Component} from 'react';
import 'whatwg-fetch';

const VIDEO_BATCH_AMOUNT = 50;
const API_KEY = 'AIzaSyD86p8C2PzxAfn6vGysciDbUW9Hg_Q3ang';
                  /*  'AIzaSyBy50_Fpj1Q9vbPgw4vQmdSj_Lf9RtHmbc'; */
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

let today = new Date();

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
            loading: true,
            videos: [],
            minViewCount: 500,
            height: window.innerHeight,
            width: window.innerWidth
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

    /*
    FIND_VIDEO + '&pageToken=' + this.state.nextPage
    FIND_VIDEO + '&videoCategoryId=' + this.getIdFromCategoryName(this.props.cardName)
    */

    getVideos = (url) => {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let url = GET_VIEW_COUNT + '&id=';
            for(let i = 0; i < data.items.length - 1; i++) {
                url += data.items[i].id.videoId + ', ';
            }
            url += data.items[data.items.length - 1].id.videoId;

            this.setState({
                nextPage: data.nextPageToken
            });

            return fetch(url);
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return this.filterByViewCount(data);
        })
        .then((filteredData) => {
            let nextVideoId = filteredData[0];
            let newVideoList = [];
            for(let i = 0; i < filteredData.length - 1; i++) {
                newVideoList[i] = filteredData[i + 1];
            }

            this.setState({
                videos: newVideoList,
                videoId: nextVideoId,
                loading: false
            });
        })
        .catch((err) => {
            console.log(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '.' + today.getMilliseconds());
            console.log(err);
            console.log(this.state);
        });
    } 

    //Removes videos with more than {this.state.viewCount} views from {this.state.videos}
    filterByViewCount = (data) => {
        let zeroViews = [];
        let index = 0;
        for(let i = 0; i < data.items.length; i++) {
            if(data.items[i].statistics.viewCount <= this.state.minViewCount) {
                zeroViews[index] = data.items[i].id;
                index++;
            }
        }

        return zeroViews;
    }

    //Gets and sets next videoId from list, removes from {this.state.videos}
    getNextVideoId = () => {
        let nextVideoId = this.state.videos[0];

        let newVideoList = [];
        for(let i = 0; i < this.state.videos.length - 1; i++) {
            newVideoList[i] = this.state.videos[i + 1];
        }

        this.setState({
            videos: newVideoList,
            videoId: nextVideoId
        });
    }
    
    componentDidMount() {
        this.getVideos(FIND_VIDEO + '&videoCategoryId=' + this.getIdFromCategoryName(this.props.cardName));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.cardName != prevProps.cardName) {
            this.setState({loading: true});
            this.getVideos(FIND_VIDEO + '&videoCategoryId=' + this.getIdFromCategoryName(this.props.cardName));
        }

        if(this.state.videos.length == 0 && !this.state.loading) {
            this.setState({loading: true});
            this.getVideos(FIND_VIDEO + '&pageToken=' + this.state.nextPage);
        }

        if(this.state.height != window.innerHeight || this.state.width != window.innerWidth) {
            this.setState({
                height: window.innerHeight,
                width: window.innerWidth
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
                    <button className="new-vid">New Video</button>
                    <button className="close-vid" onClick={this.props.close}>Close</button>
                </div>
            );
        } else {
            console.log('Height: ' + window.innerHeight + ', Width: ' + window.innerWidth);
            let height = window.innerHeight * 0.8;
            let width = window.innerWidth;
            if(this.state.width > 598) {
                width *= 0.7;
                height = window.innerHeight * 0.7;
            }

            return(
                <div>
                    <div className="flex-item" id="player">
                        <Video height={height} width={width} videoId={this.state.videoId} showing={this.props.showing} />
                    </div>
                    <button className="new-vid" onClick={this.getNextVideoId}>New Video</button>
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



    //Gets the view count of every video in {this.state.videos}
    /* getViewCount = (data) => {
        let url = GET_VIEW_COUNT + '&id=';
        for(let i = 0; i < this.state.videos.length - 1; i++) {
            url += this.state.videos[i].id.videoId + ', ';
        }
        url += this.state.videos[this.state.videos.length - 1].id.videoId;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    views: data.items,
                    loading: false
                });
            })
            .catch((err) => {
                console.log(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '.' + today.getMilliseconds());
                console.log(err);
                console.log(this.state);
            });
    }  */ 