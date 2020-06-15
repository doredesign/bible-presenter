$(document).ready(function() {

  var do_search = function(e){
    e.preventDefault();
    var search_query = $input.val();
    if(search_query.length <= 3) return false;

    var include_spanish = $checkbox.prop("checked") == true;

    $error_message.hide();

    var search_id = PresenterServer.newSearchId();
    var search_fail = function (jqXHR, textStatus, errorThrown) {
      show_error('There was an error with your search: "' + search_query + '". Please check your search and try again.');
    };
    $.getJSON('/search/' + search_query)
      .done(function(data){
        if (!data.data || !data.data.passages || !data.data.passages[0]) {
          return show_error('Could not find passage "' + search_query + '". Please check your search and try again.');
        }

        if (include_spanish) {
          if (data.data.passages[0].id) {
            $.getJSON('/spanish/' + data.data.passages[0].id)
              .done(make_callback(true, search_id));
          } else {
            show_error("Unable to include Spanish translation");
          }
        }

        make_callback(false, search_id)(data);
      })
      .always(enable_form)
      .fail(search_fail);
    disable_form();
  };

  var make_callback = function (is_spanish, search_id) {
    return function (data) {
      // $fums_container.html(data.fums);

      var event_data = {
        search_id: search_id,
        is_spanish: is_spanish
      }
      var event_id_suffix;
      if(is_spanish) {
        event_id_suffix = "_spanish";
        event_data.passage = data.data;
        TODO: turn array into a paragraph of verses.
        event_data.passage.content = data.data.content;
        $text_sp.html(event_data.passage.content);
        $copyright_container_sp.html(event_data.passage.copyright);
        $reference_sp.text(event_data.passage.reference);
      } else {
        event_id_suffix = "_english";
        event_data.passage = data.data.passages[0];
        $text.html(event_data.passage.content);
        $copyright_container.html(event_data.passage.copyright);
        $reference.text(event_data.passage.reference);
      }

      var event_id = search_id + event_id_suffix;
      PresenterServer.sendData(event_data, event_id);
    };
  };

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

  $('#passage_search').submit(do_search);
  var $button = $("#do_search");
  var $closed_window_button = $('#window_opener').click(function(e){
    e.preventDefault();
    PresenterServer.openWindow();
    $closed_window_button.fadeOut();
  });
  var $error_message = $('#error-message');
  var $input = $('#search');
  var $checkbox = $('#spanish');
  var $spinner = $('#colorwheel_container');
  var $results = $('#results .english');
  var $text = $results.find('.text');
  var $reference = $results.find('aside.reference');
  var $copyright_container = $results.find('.copyright_container');
  var $results_sp = $('#results .spanish');
  var $text_sp = $results_sp.find('.text');
  var $reference_sp = $results_sp.find('aside.reference');
  var $copyright_container_sp = $results_sp.find('.copyright_container');
  var $fums_container = $('#fums_container');

  PresenterServer.init(window_closed_handler);
});
