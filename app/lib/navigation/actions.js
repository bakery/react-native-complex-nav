import { PUSH_ROUTE, BACK, JUMP_TO_TAB } from './constants';

export function pushRoute (key, route) {
  return {
    type: PUSH_ROUTE,
    payload: {
      route,
      key,
    }
  };
}

export function goBack (key) {
  return {
    type: BACK,
    payload: {
      key
    }
  };
}

export function jumpTo(key, tabIndex) {
  return {
    type: JUMP_TO_TAB,
    payload: {
      tabIndex,
      key,
    }
  };
}
