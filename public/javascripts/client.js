$(document).ready(function() {

  console.log('we rock the client');
  var event_handler = function(data){
    // $fums_container.html(data.fums);
    var text = data.value.passages[0].text;
    $text.html(text);
    $copyright_container.html(data.value.passages[0].copyright);
  };

  PresenterClient.run(event_handler);

  var $results = $('#results');
  var $text = $results.find('#text');
  var $copyright_container = $results.find('#copyright_container');
  var $fums_container = $('#fums_container');
});
