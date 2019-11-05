'use-strict';

var makeCard = function (imgPath, topicName) {
    cardDiv = $('<div class="flex-item"></div>');
    cardTitle = this.cardDiv.append('<div class="card-title"></div>');
    cardTitle.html('<h3>' + topicName + '</h3>');

    cardDiv.css('background-image', 'url(' + imgPath + ')');

    return cardDiv;
}