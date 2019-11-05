'use-strict';

var subarray = function(array, start, end) {
    let newArray = [];
    let index = 0;
    for(let i = start; i < end; i++) {
        newArray[index] = array[i];
        index++;
    }

    return newArray;
}

var cardObjs = [{'name':'Film &amp; Animation', 'img':'../img/film2.jpg'}, 
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

var recCards = subarray(cardObjs, 0, 8);
var infoCards = subarray(cardObjs, 8, 15);

var makeCard = function (card) {
    cardDiv = $('<div class="flex-item"></div>');
    cardDiv.css('background-image', 'url(' + card.img + ')');

    cardTitle = $('<div class="card-title"></div>');
    cardTitle.html('<h3>' + card.name + '</h3>');

    cardDiv.append(cardTitle);
    return cardDiv;
}

//Assumes same number of card names and img urls and that the indices correlate,
// e.g. the first card name goes with the first card image url, etc.
var makeTopicSection = function(topicName, cards) {
    var topicSection = $('<section>');
    topicSection.append('<h2>' + topicName + '</h2>');

    var container = $('<div class="flex-container">');
    for(let i = 0; i < cards.length; i++) {
        container.append(makeCard(cards[i])[0]);
    }

    topicSection.append(container);
    $('#watch').append(topicSection);
}

makeTopicSection('Recreational', recCards);
makeTopicSection('Informational', infoCards);