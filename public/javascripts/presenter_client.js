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
    _.forEach(diff, function(event_id){
      handle_server_event(event_id);
    });
  };

  var handle_server_event = function(event_id){
    client_queue_history.push(event_id);
    if ( console && console.log ) {
      console.log('Received event: ' + event_id);
    }

    var event_data = fetch_data(event_id);
    return config.eventHandler && config.eventHandler.call(event_data, event_data, event_id);
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
