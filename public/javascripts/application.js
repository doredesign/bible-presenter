$(document).ready(function() {

  var do_search = function(e){
    e.preventDefault();

    $.getJSON('/search/' + $input.val(), function(data){
      enable_form();
      // $fums_container.html(data.fums);
      var text = data.value.passages[0].text;
      $text.html(text);
      $copyright_container.html(data.value.passages[0].copyright);
      $reference.text(data.value.passages[0].display);

      PresenterServer.sendData(data);
    });

    disable_form();
  }

  var disable_form = function(){
    $button.attr("disabled", true);
    $input.attr("disabled", true);
    $spinner.show();
  };

  var enable_form = function () {
    $button.attr("disabled", false);
    $input.attr("disabled", false);
    $spinner.hide();
  };

  var window_closed_handler = function(){
    $closed_window_button.fadeIn();
  };

  var $passage_search = $('#passage_search').submit(do_search);
  var $button = $("#do_search");
  var $closed_window_button = $('#window_opener').click(function(e){
    e.preventDefault();
    PresenterServer.openWindow();
    $closed_window_button.fadeOut();
  });
  var $input = $passage_search.find('input');
  var $spinner = $('#colorwheel_container');
  var $results = $('#results');
  var $text = $results.find('#text');
  var $reference = $results.find('aside.reference');
  var $copyright_container = $results.find('#copyright_container');
  var $fums_container = $('#fums_container');

  PresenterServer.init(window_closed_handler);
});
