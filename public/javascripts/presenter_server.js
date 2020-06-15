PresenterServer = (function(_){
  var open_window = function(){
    persist_server_queue();
    state.window_open = window.open("/client", "_blank", "toolbar=no, scrollbars=no, resizable=yes, location=no");
    if(config.monitorWindowFrequency > 0) monitor_window();
  };

  var monitor_window = function(){
    state.monitoring_window = true;
    setInterval(check_window, config.monitorWindowFrequency);
  };

  var check_window = function(){
    if(state.window_open && state.monitoring_window && state.window_open.closed){
      state.monitoring_window = false;
      config.window_closed_handler && config.window_closed_handler.call();
    }
  };

  var init = function(window_closed_handler){
    config.window_closed_handler = window_closed_handler;
  };

  var persist_server_queue = function(){
    if(arguments[0]) server_queue.push(arguments[0]);
    persist_data(config.localStore.queue, JSON.stringify(server_queue));
  };

  var persist_data = function(key, value){
    localStorage.setItem(key, value);
  };

  var send_data = function (data, event_id){
    if(!state.window_open) open_window();
    if ( console && console.log ) {
      console.log('Sending event: ' + event_id);
    }
    persist_server_queue(event_id);
    persist_data(event_id, JSON.stringify(data));
  };

  var new_search_id = function(timestamp){
    var timestamp = _.now();
    return config.localStore.eventsPrefix + timestamp;
  };

  var server_queue = [];
  var config = {
    localStore: {
      queue: "_BiblePresenterQueue",
      eventsPrefix: "_BiblePresenterEvents_"
    },
    monitorWindowFrequency: 1000
  };
  var state = {
    window_open: false,
    monitoring_window: true // set to false after the event has fired to ensure event only fires once
  }

  return {
    newSearchId: new_search_id,
    openWindow: open_window,
    sendData: send_data,
    config: config,
    init: init
  }
})(_);
