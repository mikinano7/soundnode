const SC = require('soundcloud');
const Config = require('config');

var $ = jQuery = require("./jquery-2.1.4.min.js");

function init(){
    SC.initialize({
        client_id: Config.client_id,
        redirect_uri: "http://example.com/callback.html"
    });

    SC.get('/tracks', {
        q: 'てーきゅう+metal'
    }).then(function(tracks) {
        tracks.forEach(set_artwork);
    });
}

function set_artwork(track) {
    var artwork_url = track.artwork_url;
    if (track.artwork_url == null) artwork_url = './resources/blank.png';
    $('#track_info').prepend('<img src="'+artwork_url+'" />');
}
