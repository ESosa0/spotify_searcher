$(function() {

  function search (event) {
    event.preventDefault();
    $('li').remove();
    var searchTerm = $('.name').val(); 
    var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + searchTerm);
    $('.name').val('');

    function handleArtists (response) {
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

    request.done(handleArtists)

  }



  $('.search').on('click', search);

});