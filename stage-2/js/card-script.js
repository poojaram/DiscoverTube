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
            await filterForZeroViews(await getVideoBatch(getIdFromCategoryName(card.name)));
            while(videosWithNoViews.length == 0) {
                await filterForZeroViews(await getNextPage());
            }

            $('.focus').css('display', 'inline-block');
            player.cueVideoById(await getVideo());
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