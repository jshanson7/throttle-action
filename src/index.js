import throttle from 'lodash.throttle';

export default function throttleAction(action, wait, options) {
  // for options see: https://lodash.com/docs/4.17.4#throttle
  const throttled = throttle(
    (dispatch, actionArgs) => dispatch(action(...actionArgs)),
    wait,
    options
  );

  // see: https://github.com/gaearon/redux-thunk
  const thunk = (...actionArgs) => dispatch => throttled(dispatch, actionArgs);

  // provide hook to _.throttle().cancel() to cancel any trailing invocations
  thunk.cancel = throttled.cancel;
  thunk.flush = throttled.flush;

  return thunk;
}
