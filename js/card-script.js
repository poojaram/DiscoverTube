'use-strict';

var makeCard = function (imgPath, topicName) {
    cardDiv = $('<div class="flex-item"></div>');
    cardTitle = this.cardDiv.append('<div class="card-title"></div>');
    cardTitle.html('<h3>' + topicName + '</h3>');

    return cardDiv;
}

/*console.log(makeCard('../img/test.png', 'test'));

let card = makeCard('../img/test.png', 'test');
$('section').append('<div class="flex-item">');*/

$('#test').html('TEST');

document.getElementById('test').innerHTML = 'TEST';
console.log(document.getElementById('test'));