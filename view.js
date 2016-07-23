const SC = require('soundcloud');
const Config = require('config');

var $ = jQuery = require("./jquery-2.1.4.min.js");

var orig_player;
var is_playing;
var current_music;

function init(){
    SC.initialize({client_id: Config.client_id});
}

function set_artwork(track) {
    var artwork_url = track.artwork_url;
    if (track.artwork_url == null) artwork_url = './resources/cover_none.png';
    $('#content').prepend('<div class="track" id="'+track.id+'"></div>');

    var trackElement = $('#'+track.id);
    trackElement.prepend('<p>'+track.title+'</p>');
    trackElement.prepend('<img src="'+artwork_url+'" class="change" height="100" width="100" />')
}

function play(id) {
    current_music = id;
    is_playing = true;
    orig_player.play();
}

function pause() {
    is_playing = false;
    orig_player.pause();
}

$(document).on('click', '#play', function(){
    play(current_music);
});

$(document).on('click', '#pause', function(){
    pause();
});

$(document).on('click', '.change', function(){
    var id = $(this).parent().attr('id');

    SC.stream('tracks/'+id).then(function(player){
        if (current_music == id) {
            if (is_playing) pause();
            else play(id);
        } else {
            orig_player = player;
            play(id);
        }
    });
});

$(document).on('submit', '#search', function(event) {
    $('#content').empty();
    var query = $('#search_form').val();
    SC.get('/tracks', {
        q: query
    }).then(function(tracks) {
        tracks.forEach(set_artwork);
    });
    event.preventDefault();
});
