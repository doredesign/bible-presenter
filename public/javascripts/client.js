$(document).ready(function() {

  var event_handler = function(data){
    // $fums_container.html(data.fums);
    var text = data.value.passages[0].text;
    var reference = data.value.passages[0].display;
    var $new_slide = set_passage(text);
    set_reference(reference, $new_slide);
    init_reveal();
  };

  var set_passage = function(passage){
    return add_slide(passage);
  };

  var add_slide = function(content){
    var new_slide = $('<section>' + content + '</section>');
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
        transition: 'none'
      });
    }
  };

  PresenterClient.run(event_handler);

  var $slides = $('.slides');
  var $fums_container = $('#fums_container');
  var state = {
    revealed: false
  };
});
