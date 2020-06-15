$(document).ready(function() {

  var event_handler = function(data){
    // $fums_container.html(data.fums);
    set_passage(data);
    init_reveal();
  };

  var set_passage = function (data){
    var $slide;
    if (state.existingSlides[data.search_id]) {
      $slide = state.existingSlides[data.search_id];
    } else {
      state.existingSlides[data.search_id] = $slide = $('<section id="' + data.search_id + '"></section>');
      $slides.append($slide);
    }
    $slide.append(slide_content(data));
  };

  var slide_content = function (data) {
    var klass = data.is_spanish ? "spanish" : "english";
    return '<div class="language ' + klass + '">' + data.passage.content + '<aside class="reference">' + data.passage.reference +'</aside></div>';
  };

  var init_reveal = function(){
    if(!state.revealed){
      state.revealed = true;
      Reveal.initialize({
        controls: false,
        progress: false,
        transition: 'none',
        embedded: false
      });
    }
  };

  var $slides = $('.slides');
  var $fums_container = $('#fums_container');
  var state = {
    revealed: false,
    existingSlides: {}
  };

  PresenterClient.run(event_handler);
});
