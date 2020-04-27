$(document).ready(function() {

  var event_handler = function(data, eventID){
    // $fums_container.html(data.fums);
    var html = data.data.passages[0].content;
    var reference = data.data.passages[0].reference;
    var $new_slide = set_passage(eventID, html);
    set_reference(reference, $new_slide);
    init_reveal();
  };

  var set_passage = function (eventID, html){
    return add_slide(html);
  };

  var add_slide = function(html){
    var new_slide = $('<section>' + html + '</section>');
    $slides.append(new_slide);
    return new_slide;
  };

  var set_reference = function(reference, $new_slide){
    $new_slide.append('<aside class="reference">'+reference+'</aside>');
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
    revealed: false
  };

  PresenterClient.run(event_handler);
});
