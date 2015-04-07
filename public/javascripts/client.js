$(document).ready(function() {

  console.log('we rock the client');
  var event_handler = function(data){
    // $fums_container.html(data.fums);
    var text = data.value.passages[0].text;
    set_passage(text);
    init_reveal();
  };

  var set_passage = function(passage){
    add_slide(passage);
  };

  var add_slide = function(content){
    var slide_content = '<section>' + content + '</section>';
    $slides.append(slide_content);
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
