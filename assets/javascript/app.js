$(document).ready(function () {
  // Array of strings 
  var topics = ["ocean", "sun", "wind", "rain", "storm", "mountains", "river", "snow", "lake", "lightening", "sky", "tree", "cloud"];

  // Display button-bar
  createButtons();

  $(document).on('click', '.nature', function () {
    $('.card-columns').empty();
    var nature = $(this).html();
    console.log(nature);

    // Constructing a queryURL using the nature keywords
    // API key: YQaJ38AcYKNHMLnV3FlW0DaSDiv5yHOL + &limit=10 --> grab 10 images from GIPHY API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nature + "&api_key=YQaJ38AcYKNHMLnV3FlW0DaSDiv5yHOL&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
      // After data comes back from the request
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);

      // storing the data from the AJAX request in the results variable
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var idTag = nature + i;
        var idTagFixed = idTag.split(' ').join('');
        // Card -> Gif image + title + rating
        var card = $('<div>', { class: 'card', id: idTagFixed });

        var viewImg = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var natureGif = $('<img>', { class: 'card-img-top img-fluid' })
          .attr('src', still)
          .attr('data-animate', viewImg)
          .attr('data-still', still)
          .attr('data-state', 'still')
          .on('click', playGif);

        var cardBody = $('<div>', { class: 'card-body' });
        // GIF title
        var title = $('<h4>', { class: 'card-title' });
        title = results[i].title;
        // GIF rating
        var rating = results[i].rating;
        var cardRating = $('<p>').text('Rating: ' + rating);

        cardBody.append(title);
        cardBody.append(cardRating);
        card.append(natureGif);
        card.append(cardBody);

        $('.card-columns').append(card);

      }
    });

  });

  function playGif() {
    var state = $(this).attr('data-state');

    // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
    if (state === 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still')
    }
  };

  // Create new buttons
  function createButtons() {
    $('#buttons-view').empty();
    for (var i = 0; i < topics.length; i++) {
      var btn = $('<button>');
      btn.addClass('nature btn');
      btn.attr('data-nature', topics[i]);
      btn.text(topics[i]);
      $('#buttons-view').append(btn);
    }
  };

  //  Add new gif button after user type keyword in text box
  $('#addNature').on('click', function (event) {
    event.preventDefault();
    var nature = $('#btnInput').val().trim();
    topics.push(nature);
    createButtons();
  });

})
