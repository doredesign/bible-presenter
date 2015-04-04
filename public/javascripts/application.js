$(document).ready(function() {

	// Open external links in a new window
	hostname = window.location.hostname
	$("a[href^=http]")
	  .not("a[href*='" + hostname + "']")
	  .addClass('link external')
	  .attr('target', '_blank');

  var $button = $("#do_search").click(function(e){
    e.preventDefault();

     $.getJSON('/search/' + $input.val(), function(data){
      enable_form();
      $results.html(data.result);
     });

     disable_form();
  });

  var $passage_search = $('#passage_search');
  var $input = $passage_search.find('input');
  var $spinner = $('#colorwheel_container');
  var $results = $('#results');

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

});
