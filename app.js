$(function() {

  var Spotify = function () {
    this.artists = [];
  };

  Spotify.prototype.searchArtists = function (event) {
    event.preventDefault();
    $('li').remove();
    var searchTerm = $('.name').val(); 
    $.get('https://api.spotify.com/v1/search?type=artist&query=' + searchTerm, this.handle);
    $('.name').val('').blur();
  };


  Spotify.prototype.searchAlbums = function (event) {
    event.preventDefault();
    $('.albums').empty();
    var artist = event.currentTarget.innerText;
    $.get('https://api.spotify.com/v1/search?q=artist:' + artist + '&type=album', this.handle);
  }

  Spotify.prototype.searchTracks = function (event) {
    event.preventDefault();
    var album = event.currentTarget.id;
    $.get('https://api.spotify.com/v1/albums/' + album + '/tracks', this.handleTracks);
  }
  
  Spotify.prototype.handle = function(response) {
    
    for(var key in response) {
      var value = response[key]; 
      value.items.forEach(function(thing){
        if(thing.images.length !== 0){
          var image = '<img src="' + thing.images[0].url + '">';
          var nameImage = '<li> <a id="' + thing.id + '">' + thing.name + '</a>' + image + '</li>';
          $('.' + key).append(nameImage);
        } else {
          var name = '<li>' + thing.name + '</li>' 
          $('.' + key).append(name);
        }
      });
    }

  Spotify.prototype.handleTracks = function(response) {
    
    response.items.forEach(function(track){
        var name = '<li> <a href="' + track.preview_url + '">' + track.name + '</li>' 
        $('.tracks').append(name);
      });
    }
  }

  var spoti = new Spotify();

  $('.search').on('click', spoti.searchArtists.bind(spoti));
  $('.artists').on('click', 'a', spoti.searchAlbums.bind(spoti));
  $('.albums').on('click', 'a', spoti.searchTracks.bind(spoti));


});


