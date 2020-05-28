function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listen => {
      listen();
    });
    return action;
  }
  function subscribe(handler) {
    listeners.push(handler);
    return function unsubscribe() {
      const index = listeners.indexOf(handler);
      listeners.splice(index, 1);
    }
  }
}
