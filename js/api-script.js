'use-strict'

const API_KEY = 'AIzaSyD86p8C2PzxAfn6vGysciDbUW9Hg_Q3ang';
const FIND_VIDEO = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoEmbeddable=true&key=' + API_KEY;
const NEXT_PAGE_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoEmbeddable=true&key=' + API_KEY;
const GET_VIEW_COUNT = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=' + API_KEY;

var videoCategoryIds = [{'name':'Film &amp; Animation', 'id':1}, 
                        {'name':'Music', 'id':2}, 
                        {'name':'Pets &amp; Animals', 'id':10}, 
                        {'name':'Sports', 'id':15}, 
                        {'name':'Gaming', 'id':17}, 
                        {'name':'People &amp; Blogs', 'id':19}, 
                        {'name':'Comedy', 'id':20}, 
                        {'name':'Entertainment', 'id':22}, 
                        {'name':'Travel &amp; Events', 'id':23}, 
                        {'name':'Cars', 'id':24}, 
                        {'name':'News &amp; Politics', 'id':25}, 
                        {'name':'How-to', 'id':26}, 
                        {'name':'Education', 'id':27}, 
                        {'name':'Science &amp; Technology', 'id':28}, 
                        {'name':'Nonprofits &amp; Activism', 'id':29}];

var getIdFromCategoryName = function(categoryName) {
    for(let i = 0; i < videoCategoryIds.length; i++) {
        if(videoCategoryIds[i].name == categoryName) {
            return videoCategoryIds.id;
        }
    }

    return -1;
}

var getVideo = function(url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let videoId = data.items[0].id.videoId;
            let nextPage = data.nextPageToken;
            return {'videoId':videoId, 'nextPage':nextPage};
        })
        .catch(function(err) {
            console.error(err);
        });
}

var zeroViews = function(videoId) {
    let url = GET_VIEW_COUNT + '&id=' + videoId;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.items[0].statistics.viewCount == 0;
        })
}

var urlVideoChain = FIND_VIDEO + '&videoCategoryId=';
var urlVideoFromNextPage = NEXT_PAGE_URL + '&pageToken=';

var getVideoWithZeroViews = function(categoryId) {
    let video = getVideo(urlVideoChain + categoryId);
    let hasZeroViews = zeroViews(video.videoId);

    while(!zeroViews) {
        video = getVideo(urlVideoFromNextPage + video.nextPage);
        hasZeroViews = zeroViews(video.videoId);
    }

    return video.videoId;
}