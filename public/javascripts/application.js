$(document).ready(function() {

  var do_search = function(e){
    e.preventDefault();
    var search_query = $input.val();
    if(search_query.length <= 3) return false;

    $error_message.hide();

    $.getJSON('/search/' + search_query)
      .done(function(data){
        // $fums_container.html(data.fums);

        if(!data.data.passages || !data.data.passages[0]){
          return show_error('Could not find passage "'+ search_query +'". Please check your search and try again.');
        }

        var html = data.data.passages[0].content;
        $text.html(html);
        $copyright_container.html(data.data.passages[0].copyright);
        $reference.text(data.data.passages[0].reference);

        PresenterServer.sendData(data);
      })
      .always(function(){
        enable_form();
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        show_error('There was an error with your search: "'+ search_query +'". Please check your search and try again.');
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

  var show_error = function(error_message){
    $error_message.text(error_message).show();
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
  var $error_message = $('#error-message');
  var $input = $passage_search.find('input');
  var $spinner = $('#colorwheel_container');
  var $results = $('#results');
  var $text = $results.find('#text');
  var $reference = $results.find('aside.reference');
  var $copyright_container = $results.find('#copyright_container');
  var $fums_container = $('#fums_container');

  PresenterServer.init(window_closed_handler);
});
