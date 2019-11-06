'use-strict'

const VIDEO_BATCH_AMOUNT = 50;
const API_KEY = 'AIzaSyD86p8C2PzxAfn6vGysciDbUW9Hg_Q3ang';
const FIND_VIDEO = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + VIDEO_BATCH_AMOUNT + '&type=video&videoEmbeddable=true&key=' + API_KEY;
const GET_VIEW_COUNT = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&maxResults=' + VIDEO_BATCH_AMOUNT + '&key=' + API_KEY;

let videoCategoryIds = [{'name':'Film &amp; Animation', 'id':1}, 
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

let getIdFromCategoryName = function(categoryName) {
    for(let i = 0; i < videoCategoryIds.length; i++) {
        if(videoCategoryIds[i].name == categoryName) {
            return videoCategoryIds[i].id;
        }
    }

    return -1;
}

let getViews = async function(videos) {
    try {
        let url = GET_VIEW_COUNT + '&id=';
        for(let i = 0; i < videos.length - 1; i++) {
            url += videos[i].id.videoId + ', ';
        }
        url += videos[videos.length - 1].id.videoId;

        let views = await fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return data.items;
            });

        return views;
    } catch(err) {
        console.log(err);
    }
}

let nextPage = '';
let videosWithNoViews = [];
let getVideosWithZeroViews = async function(categoryId) {
    try {
        let batch = await fetch(FIND_VIDEO + '&videoCategoryId=' + categoryId)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return data;
            });

        let videos = batch.items;
        nextPage = batch.nextPageToken;
        let views = getViews(videos);
        
        let zeroViews = [];
        let index = 0;
        for(let i = 0; i < videos.length; i++) {
            if(views[i].statistics.viewCount == 0) {
                zeroViews[index] = videos[i].id.videoId;
            }
        }

        return zeroViews;
    } catch(err) {
        console.log(err);
    }
}

let getVideo = async function() {
    if(videosWithNoViews === []) {

    } else {
        
    }
}