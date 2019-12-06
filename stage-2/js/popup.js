'use-strict';

let focusDiv = $('<div class="focus"></div>');
let container = '<div class="flex-container" style="width: 100%; height: 100%;"><div class="flex-item" id="player"></div></div>';
let title = '<i class="fa fa-times" aria-hidden="true"></i>';
let buttons = '<button class="new-vid">New Video</button>';
let tag = document.createElement('script'); 
tag.src = 'https://www.youtube.com/iframe_api'; 
let firstScriptTag = document.getElementsByTagName('script')[0]; 
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
let player; 
function onYouTubeIframeAPIReady() { 
    player = new YT.Player('player', { 
    height: '390', 
    width: '640', 
    videoId: 'M7lc1UVf-VE', 
        events: { 
            'onReady': onPlayerReady 
        } 
    }); 
} 
 function onPlayerReady(event) { 
     event.target.playVideo(); 
 }

/* let scriptTag = $('<script></script>');
scriptTag.html(script); */

focusDiv.html(title + container + buttons);
/* focusDiv.append(scriptTag);
 */$('main').prepend(focusDiv);

$('.fa-times').click(function(event) {
    $('.focus').css('display', 'none');
});

$('.new-vid').click(async function(event) {
    try {
        player.cueVideoById(await getVideo());
    } catch(err) {
        console.log(err);
    }
});

let initialize = async function() {
    try {
        
    } catch(err) {
        console.log(err);
    }
}

initialize();