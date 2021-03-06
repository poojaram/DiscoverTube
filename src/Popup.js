import React from 'react';
import YouTube from 'react-youtube';
import {Component} from 'react';
import firebase from 'firebase/app';
import withSizes from 'react-sizes';
import 'whatwg-fetch';

const VIDEO_BATCH_AMOUNT = 50;
const API_KEY = /* 'AIzaSyD86p8C2PzxAfn6vGysciDbUW9Hg_Q3ang'; */
                   /* 'AIzaSyBy50_Fpj1Q9vbPgw4vQmdSj_Lf9RtHmbc'; */
                   'AIzaSyCIJZrCeXh1uyVHvclmoFDMAx8kKVETx_M';
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

class Popup extends Component {
    render() {
        let focusStyle = {display: this.props.popupDisplay};
        let containerStyle = {width: "100%", height: "100%"};
        return(
            <div className="focus" style={focusStyle}>
                <div className="flex-container" style={containerStyle}>
                    <Player close={this.props.close} cardName={this.props.cardName} showing={(this.props.popupDisplay == 'block')}
                        currentUsername={this.props.currentUsername} savedVideosCallback={() => this.props.savedVideosCallback() } 
                        width={this.props.width} height={this.props.height} />
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
            error: false,
            videos: [],
            minViewCount: 500,
            height: window.innerHeight,
            width: window.innerWidth,
            saved: false
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

            let rawVideos = data.items;

            this.setState({
                nextPage: data.nextPageToken,
                rawVideos: rawVideos
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
                loading: false,
                error: false
            });
        })
        .catch((err) => {
            console.log(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '.' + today.getMilliseconds());
            console.log(err);

            this.setState({
                error: true
            });
        });

        this.checkIfSaved();
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

        this.checkIfSaved();
    }

    saveVideo = () => {
        if(this.props.currentUsername != 'Guest') {
            let curVideoId = '';
            let videoIndex = -1;
            while(curVideoId != this.state.videoId) {
                videoIndex++;
                curVideoId = this.state.rawVideos[videoIndex].id.videoId;
            }

            if(this.state.rawVideos[videoIndex].snippet.title.length > 26) {
                let title = this.state.rawVideos[videoIndex].snippet.title;
                this.state.rawVideos[videoIndex].snippet.title = title.substring(0, 26);
            }

            let newLike = {
                videoId: this.state.videoId,
                videoTitle: this.state.rawVideos[videoIndex].snippet.title,
                videoImg: this.state.rawVideos[videoIndex].snippet.thumbnails
            };

            let databaseRef = firebase.database().ref('likes/' + this.props.currentUsername);
            databaseRef.once('value')
                .then((snapshot) => {
                    return snapshot.val();
                })
                .then((val) => {
                    let likedVideos = {};
                    if(val != null) {
                        likedVideos = val;
                    }

                    let existingVideoKey = '';
                    Object.keys(likedVideos).forEach((videoKey) => {
                        if(likedVideos[videoKey].videoId == this.state.videoId) {
                            existingVideoKey = videoKey
                        }
                    });

                    if(existingVideoKey == '') {
                        this.setState({
                            saved: true
                        });
                        databaseRef.push(newLike);
                    } else {
                        this.setState({
                            saved: false
                        })
                        firebase.database().ref('likes/' + this.props.currentUsername + '/' + existingVideoKey).set(null);
                    }
                });
        }
    }

    handleSaveClick = () => {
        this.saveVideo();
        this.props.savedVideosCallback();
    }

    checkIfSaved = () => {
        console.log(this.state.saved);
        let databaseRef = firebase.database().ref('likes/' + this.props.currentUsername);
        databaseRef.once('value')
            .then((snapshot) => {
                return snapshot.val();
            })
            .then((val) => {
                let likedVideos = {};
                if(val != null) {
                    likedVideos = val;
                }

                let existingVideoKey = '';
                Object.keys(likedVideos).forEach((videoKey) => {
                    if(likedVideos[videoKey].videoId == this.state.videoId) {
                        existingVideoKey = videoKey
                    }
                });

                if(existingVideoKey == '') {
                    this.setState({
                        saved: false
                    });
                } else {
                    this.setState({
                        saved: true
                    });
                }
            });
    }
    
    componentDidMount() {
        this.getVideos(FIND_VIDEO + '&videoCategoryId=' + this.getIdFromCategoryName(this.props.cardName));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.cardName != prevProps.cardName) {
            this.setState({loading: true});
            this.getVideos(FIND_VIDEO + '&videoCategoryId=' +  this.getIdFromCategoryName(this.props.cardName));
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
        if(this.state.error) {
            return (
                <div>
                    <ErrorMessage errorLog={this.state.errorLog} />
                    <button className="close-vid" onClick={this.props.close}>Close</button>
                </div>
            );
        } else if(this.state.loading) {
            return (
                <div>
                    <p className='loading'>LOADING</p>
                    <button className="close-vid" onClick={this.props.close}>Close</button>
                </div>
            );
        } else {
            let height = this.props.height * 0.8;
            let width = this.props.width;
            if(this.props.width > 598) {
                width *= 0.7;
                height = this.props.height * 0.7;
            }

            let saveButtonText = 'Save';
            if(this.state.saved) {
                saveButtonText = 'Unsave';
            }

            return(
                <div>
                    <div className="flex-item" id="player">
                        <Video height={height} width={width} videoId={this.state.videoId} showing={this.props.showing} />
                    </div>
                    <div className="flex-container">
                        <button className="flex-item player-btn" onClick={this.props.close}>Close</button>
                        <button className="flex-item player-btn" onClick={this.handleSaveClick}>{saveButtonText}</button>
                        <button className="flex-item player-btn" onClick={this.getNextVideoId}>Next</button>
                    </div>
                </div>
            );
        }
    }
}

export class Video extends Component {
    whenReady(event) {
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

class ErrorMessage extends Component {
    render() {
        return(
            <div>
                <p className='error'>Error: Video unable to load</p>
            </div>
        );
    }
}

const mapSizesToProps = (sizes) => ({
    width: sizes.width,
    height: sizes.height
});

export default withSizes(mapSizesToProps)(Popup);