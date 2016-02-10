$(function() {

  var Spotify = function () {
    this.artists = [];
  };

  Spotify.prototype.search = function (event) {
    event.preventDefault();
    $('li').remove();
    var searchTerm = $('.name').val(); 
    $.get('https://api.spotify.com/v1/search?type=artist&query=' + searchTerm, this.handleArtists);
    $('.name').val('').blur();
  };

  Spotify.prototype.handleArtists = function(response) {
    response.artists.items.forEach(function(artist){
      if(artist.images.length !== 0){
        var image = '<img src="' + artist.images[0].url + '">'
        var nameImage = '<li>' + artist.name + image + '</li>'
        $('.artists').append(nameImage);
      } else {
        var name = '<li>' + artist.name + '</li>' 
        $('.artists').append(name);
      }
    });
  } 

  var spoti = new Spotify();

  $('.search').on('click', spoti.search.bind(spoti));

});


