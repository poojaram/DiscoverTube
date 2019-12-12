import React, {Component} from 'react';
import {Video} from '../Popup.js';
import withSizes from 'react-sizes';
import './SavedVideosStyle.css';

class VideoGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playVideo: false,
            videoId: ''
        };
    }

    openVideo = (videoId) => {
        this.setState({
            playVideo: true,
            videoId: videoId
        });
    }

    closeVideo = () => {
        this.setState({
            playVideo: false
        });
    }

    render() {
        if(this.props.videoInfo != null) {
            let video = null;
            if(this.state.playVideo) {
                let height = this.props.height * 0.8;
                let width = this.props.width;
                if(this.props.width > 598) {
                    width *= 0.7;
                    height = this.props.height * 0.7;
                }

                let containerStyle = {width: '100%', height: '100%'};
                let focusStyle = {display: 'block'};

                video = (
                    <div className='focus' style={focusStyle}>
                        <div id='player-holder' className='library'>
                            <div id='player' className='library'>
                                <Video height={height} width={width} videoId={this.state.videoId} showing={true} />
                            </div>
                            <button className='player-btn library' onClick={this.closeVideo}>Close</button>
                        </div>
                    </div>
                );
            }
        
            let videoCards = Object.keys(this.props.videoInfo).map((videoKey) => {
                let video = this.props.videoInfo[videoKey];
                if(!this.props.isMobile) {
                    return <VideoThumbnail openVideoCallback={this.openVideo} id={video.videoId} key={video.videoId} title={video.videoTitle} imgLink={video.videoImg.high.url} />
                } else {
                    return <VideoThumbnail openVideoCallback={this.openVideo} id={video.videoId} key={video.videoId} title={video.videoTitle} imgLink={video.videoImg.medium.url} />
                }
            });

            return(
                <div id='saved'>
                    {video}
                    <h1>Saved Videos</h1>
                    <div className='flex-container'>
                        {videoCards}
                    </div>
                </div>
            );
        } else {
            return(
                <div id='saved'>
                    <h1>Saved Videos</h1>
                </div>
            );
        }
    }
}

class VideoThumbnail extends Component {
    handleClick = () => {
        this.props.openVideoCallback(this.props.id);
    }

    render() {
        let cardName = this.props.title;
        let imgLink = this.props.imgLink;
    
        const style = {
            backgroundImage: 'url(' + imgLink + ')'
        };

        return(
            <div className='flex-item video-card' onClick={this.handleClick} style = {style}>
                <div className='card-title video-title'>
                    <h3>{cardName}</h3>
                </div>
            </div>
        );
    }
}

const mapSizesToProps = (sizes) => ({
    width: sizes.width,
    height: sizes.height,
    isMobile: sizes.width < 598
});

export default withSizes(mapSizesToProps)(VideoGrid);