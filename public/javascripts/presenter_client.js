PresenterClient = (function(server, $, _){
  var run = function(event_handler){
    config.eventHandler = event_handler;
    monitor_queue();
  };

  var monitor_queue = function(){
    setInterval(check_queue, config.queueCheckFrequency);
  };

  var check_queue = function(){
    var queue_state = fetch_data(server.config.localStore.queue);
    var diff = _.difference(queue_state, client_queue_history);
    _.forEach(diff, function(server_event_name){
      handle_server_event(server_event_name);
    });
  };

  var handle_server_event = function(server_event_name){
    client_queue_history.push(server_event_name);
    if ( console && console.log ) {
      console.log('Received event: ' + server_event_name);
    }

    var event_data = fetch_data(server_event_name);
    return config.eventHandler && config.eventHandler.call(event_data, server_event_name);
  };

  var fetch_data = function(key){
    return $.parseJSON(localStorage.getItem(key));
  };

  var client_queue_history = [];
  var config = {
    queueCheckFrequency: 1000
  };

  return {
    run: run,
    config: config
  }
})(PresenterServer, jQuery, _);
