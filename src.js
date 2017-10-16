import includes from 'lodash/includes';
import drop from 'lodash/drop';

import {
  setPageProps,
  replacePageProps,
  transformPageProps
} from 'pages-core';

let handledActions = [SET_PAGE_PROPS, REPLACE_PAGE_PROPS];
let transformers = {};

export const SET_PAGE_PROPS = 'SET_PAGE_PROPS';
export const REPLACE_PAGE_PROPS = 'REPLACE_PAGE_PROPS';

export function createRootPageReducer(rootPageState) {
  return function (state = rootPageState, action) {
    // Just return state if the action is not a pages action.
    if (!includes(handledActions, action.type)) {
      return state;
    }
    let root = state, {path, props} = action.payload;
    if (path[0] !== state.key) {
      return state;
    }
    if (action.type === SET_PAGE_PROPS) {
      return setPageProps(root, drop(path), props);
    } else if (action.type === REPLACE_PAGE_PROPS) {
      return replacePageProps(root, drop(path), props);
    } else {
      let transformer = transformers[action.type];
      return transformPageProps(root, drop(path), function(old) {
        return transformer(old, action);
      });
    }
  };
}

export function definePageAction(type, transformer) {
  if (includes(handledActions, type)) {
    throw `Redefine action ${type}`;
  }
  handledActions.push(type);
  transformers[type] = transformer;
}
