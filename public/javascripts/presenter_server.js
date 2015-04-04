PresenterServer = (function(_){
  var open_window = function(){
    persist_server_queue();
    state.window_open = window.open("/client", "_blank", "toolbar=no, scrollbars=no, resizable=yes, top=300, left=500, width=400, height=400");
  };

  var persist_server_queue = function(){
    if(arguments[0]) server_queue.push(arguments[0]);
    persist_data(config.localStore.Queue, JSON.stringify(server_queue));
  };

  var persist_data = function(key, value){
    localStorage.setItem(key, value);
  };

  var send_data = function(data){
    if(!state.window_open) open_window();
    var event_name_str = event_name(_.now());
    console.log('Sending event: ' + event_name_str);
    persist_server_queue(event_name_str);
    persist_data(event_name_str, JSON.stringify(data));
  };

  var event_name = function(timestamp){
    return config.localStore.EventsPrefix + timestamp;
  };

  var server_queue = [];
  var config = {
    localStore: {
      Queue: "_BiblePresenterQueue",
      EventsPrefix: "_BiblePresenterEvents_"
    }
  };
  var state = {
    window_open: false
  }

  return {
    openWindow: open_window,
    sendData: send_data,
    config: config
  }
})(_);