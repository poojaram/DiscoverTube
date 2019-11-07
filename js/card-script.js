'use-strict';

let subarray = function(array, start, end) {
    let newArray = [];
    let index = 0;
    for(let i = start; i < end; i++) {
        newArray[index] = array[i];
        index++;
    }

    return newArray;
}

let cardObjs = [{'name':'Film &amp; Animation', 'img':'../img/film2.jpg'}, 
                {'name':'Music', 'img':'../img/music.jpg'}, 
                {'name':'Pets &amp; Animals', 'img':'../img/pets_2.png'}, 
                {'name':'Sports', 'img':'../img/sports.jpg'}, 
                {'name':'Gaming', 'img':'../img/gaming.jpg'}, 
                {'name':'People &amp; Blogs', 'img':'../img/people.jpg'}, 
                {'name':'Comedy', 'img':'../img/comedy.jpg'}, 
                {'name':'Entertainment', 'img':'../img/entertainment.jpg'}, 
                {'name':'Travel &amp; Events', 'img':'../img/travel.jpg'}, 
                {'name':'Cars', 'img':'../img/autos.jpg'}, 
                {'name':'News &amp; Politics', 'img':'../img/news.jpg'}, 
                {'name':'How-to', 'img':'../img/howto.jpg'}, 
                {'name':'Education', 'img':'../img/education.jpg'}, 
                {'name':'Science &amp; Technology', 'img':'../img/science.jpg'}, 
                {'name':'Nonprofits &amp; Activism', 'img':'../img/activism.jpg'}];

let recCards = subarray(cardObjs, 0, 8);
let infoCards = subarray(cardObjs, 8, 15);

let makeCard = function (card) {
    cardDiv = $('<div class="flex-item card"></div>');
    cardDiv.css('background-image', 'url(' + card.img + ')');

    cardDiv.click(async function(event) {
        try {
            let focusDiv = $('<div class="focus"></div>');
            let popupDiv = $('<div class="popup"></div>');
            let title = '<h2>Video Title <i class="fa fa-times" aria-hidden="true"></i></h2>';
            let videoBox = '<div id="player"></div>';
            let buttons = '<button class="yt-link">YouTube</button><button class="new-vid">New Video</button>';
            let script = 
             "let tag = document.createElement('script');" +
             "tag.src = 'https://www.youtube.com/iframe_api';" +
             "let firstScriptTag = document.getElementsByTagName('script')[0];" +
             "firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);" +
             "let player;" +
             "function onYouTubeIframeAPIReady() {" +
                 "player = new YT.Player('player', {" +
                 "height: '390'," +
                 "width: '640'," +
                 "videoId: 'M7lc1UVf-VE'," +
                 "events: {" +
                     "'onReady': onPlayerReady" +
                 "}" +
                 "});" +
             "}" +
             "function onPlayerReady(event) {" +
                 "event.target.playVideo();" +
             "}"

            let scriptTag = $('<script></script>');
            scriptTag.html(script);

            focusDiv.append(popupDiv.html(title + videoBox + buttons));
            focusDiv.append(scriptTag);
            $('main').prepend(focusDiv);

            /* $('.fa-times').click(function(event) {
                $('.focus').remove();
            });

            $('.new-vid').click(async function(event) {
                try {
                    console.log(await getVideo());
                } catch(err) {
                    console.log(err);
                }
            });

            await filterForZeroViews(await getVideoBatch(getIdFromCategoryName(card.name)));

            while(videosWithNoViews.length == 0) {
                await filterForZeroViews(await getNextPage());
            }

            console.log(videosWithNoViews); */
        } catch(err) {
            console.log(err);
        }
    });

    cardTitle = $('<div class="card-title"></div>');
    cardTitle.html('<h3>' + card.name + '</h3>');

    cardDiv.append(cardTitle);
    return cardDiv;
}

//Assumes same number of card names and img urls and that the indices correlate,
// e.g. the first card name goes with the first card image url, etc.
let makeTopicSection = function(topicName, cards) {
    let topicSection = $('<section>');
    topicSection.append('<h2>' + topicName + '</h2>');

    let container = $('<div class="flex-container">');

    for(let i = 0; i < cards.length; i++) {
        container.append(makeCard(cards[i])[0]);
    }

    topicSection.append(container);
    $('#watch').append(topicSection);
}

makeTopicSection('Recreational', recCards);
makeTopicSection('Informational', infoCards);