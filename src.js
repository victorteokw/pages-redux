import {setPageProps, replacePageProps} from 'pages-core';

import includes from 'lodash/includes';
import cloneDeep from 'lodash/cloneDeep';
import drop from 'lodash/drop';
import keys from 'lodash/keys';

// Action Types

export const SET_PAGE_PROPS = 'SET_PAGE_PROPS';

export const REPLACE_PAGE_PROPS = 'REPLACE_PAGE_PROPS';

// Action Creators

export function createSetPagePropsAction(path, props) {
  return {
    type: SET_PAGE_PROPS,
    payload: {
      path,
      props
    }
  }
}

export function createReplacePagePropsAction(path, props) {
  return {
    type: REPLACE_PAGE_PROPS,
    payload: {
      path,
      props
    }
  }
}

let pageActions = {};

export function addPageAction(type, transformer) {
  pageActions[type] = transformer;
}

// Reducer

function applyTransformer(transformer, state, action) {
  let {path} = action.payload;
  let subState = subStateAtPath(state, path);
  let newAction = cloneDeep(action);
  delete newAction.payload.path;
  return replaceChildPagePropsAtPath(path, transformer(subState.props, action), state);
}

export default function createPageReducer(initialState) {

  let actionTypes = [SET_PAGE_PROPS, REPLACE_PAGE_PROPS].concat(keys(pageActions));

  return function(state = initialState, action) {

    if (!includes(actionTypes, action.type)) {
      return state;
    }

    let {path, props} = action.payload;

    if (path[0] === state.key) {
      switch (action.type) {
        case SET_PAGE_PROPS:
          return setPageProps(cloneDeep(state), drop(path), props);
        case REPLACE_PAGE_PROPS:
          return replacePageProps(cloneDeep(state), drop(path), props);
        default:
          if (action.type in pageActions) {
            let transformer = pageActions[action.type];
            return applyTransformer(transformer, cloneDeep(state), action);
          }
          return state;
      }
    }

    return state;
  }
}