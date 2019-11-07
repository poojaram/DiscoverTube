'use-strict';

const VIDEO_BATCH_AMOUNT = 50;
const API_KEY = 'AIzaSyD86p8C2PzxAfn6vGysciDbUW9Hg_Q3ang';
const FIND_VIDEO = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + VIDEO_BATCH_AMOUNT + '&type=video&videoEmbeddable=true&order=date&key=' + API_KEY;
const GET_VIEW_COUNT = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&maxResults=' + VIDEO_BATCH_AMOUNT + '&key=' + API_KEY;

let videoCategoryIds = [{'name':'Film &amp; Animation', 'id':1}, 
                        {'name':'Music', 'id':10}, 
                        {'name':'Pets &amp; Animals', 'id':15}, 
                        {'name':'Sports', 'id':17}, 
                        {'name':'Gaming', 'id':20}, 
                        {'name':'People &amp; Blogs', 'id':22}, 
                        {'name':'Comedy', 'id':23}, 
                        {'name':'Entertainment', 'id':24}, 
                        {'name':'Travel &amp; Events', 'id':19}, 
                        {'name':'Cars', 'id':2}, 
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
let getVideoBatch = async function(categoryId) {
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
        videosWithNoViews = [];

        return videos;
    } catch(err) {
        console.log(err);
    }
}

let getNextPage = async function() {
    try {
        let nextBatch = await fetch(FIND_VIDEO + '&pageToken=' + nextPage)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return data;
            });

            nextPage = nextBatch.nextPageToken;
            return nextBatch.items;
    } catch(err) {
        console.log(err);
    }
}

let filterForZeroViews = async function(videos) {
    try {
        let views = await getViews(videos);
        let zeroViews = [];
        let index = 0;
        for(let i = 0; i < videos.length; i++) {
            if(views[i].statistics.viewCount <= 500) {
                zeroViews[index] = videos[i].id.videoId;
                index++;
            }
        }

        videosWithNoViews = zeroViews;
    } catch(err) {
        console.log(err);
    }
}

let updateVideoList = function() {
    for(let i = 0; i < videosWithNoViews.length - 1; i++) {
        videosWithNoViews[i] = videosWithNoViews[i + 1]
    }
    videosWithNoViews[videosWithNoViews.length - 1] = null;

    if(videosWithNoViews[0] == null) {
        videosWithNoViews = [];
    }
}

let getVideo = async function() {
    try {
        if(videosWithNoViews.length == 0) {
            await filterForZeroViews(await getNextPage());
        }

        let video = videosWithNoViews[0];
        updateVideoList();
        return video;
    } catch(err) {
        console.log(err);
    }
}

let embedVideo = async function(videoId) {

}