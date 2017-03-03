# Throttle Action [![NPM version][npm-image]][npm-url]

Create throttled [redux-thunk](https://github.com/gaearon/redux-thunk) actions.  Throttled actions can be dispatched at most once per every `wait` milliseconds.

## Installation

```sh
npm i --save throttle-action
```

## Usage

```javascript
import throttleAction from 'throttle-action';

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementThunk() {
  return dispatch => {
    dispatch(increment());
  };
}

// wrap normal actions with throttleAction() to create throttled actions
const incrementThrottled = throttleAction(increment, 1000);
const incrementThunkThrottled = throttleAction(incrementThunk, 5000, {trailing: false});

// call throttled actions like normal redux actions
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.dispatch(incrementThrottled());
// --> INCREMENT_COUNTER dispatched immediately
store.dispatch(incrementThrottled());
// --> INCREMENT_COUNTER dispatched again after one second

store.dispatch(incrementThunkThrottled());
// --> INCREMENT_COUNTER dispatched immediately
store.dispatch(incrementThunkThrottled());
store.dispatch(incrementThunkThrottled());
// --> nothing dispatched
```

Uses [lodash's `throttle`](https://lodash.com/docs/4.17.4#throttle).

## License

MIT

[npm-image]: https://badge.fury.io/js/throttle-action.svg
[npm-url]: https://npmjs.org/package/throttle-action
