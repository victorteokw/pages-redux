'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPLACE_PAGE_PROPS = exports.SET_PAGE_PROPS = undefined;
exports.createSetPagePropsAction = createSetPagePropsAction;
exports.createReplacePagePropsAction = createReplacePagePropsAction;
exports.addPageAction = addPageAction;
exports.default = createPageReducer;

var _pagesCore = require('pages-core');

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _drop = require('lodash/drop');

var _drop2 = _interopRequireDefault(_drop);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action Types

var SET_PAGE_PROPS = exports.SET_PAGE_PROPS = 'SET_PAGE_PROPS';

var REPLACE_PAGE_PROPS = exports.REPLACE_PAGE_PROPS = 'REPLACE_PAGE_PROPS';

// Action Creators

function createSetPagePropsAction(path, props) {
  return {
    type: SET_PAGE_PROPS,
    payload: {
      path: path,
      props: props
    }
  };
}

function createReplacePagePropsAction(path, props) {
  return {
    type: REPLACE_PAGE_PROPS,
    payload: {
      path: path,
      props: props
    }
  };
}

var pageActions = {};

function addPageAction(type, transformer) {
  pageActions[type] = transformer;
}

// Reducer

function applyTransformer(transformer, state, action) {
  var path = action.payload.path;

  var subState = subStateAtPath(state, path);
  var newAction = (0, _cloneDeep2.default)(action);
  delete newAction.payload.path;
  return replaceChildPagePropsAtPath(path, transformer(subState.props, action), state);
}

function createPageReducer(initialState) {

  var actionTypes = [SET_PAGE_PROPS, REPLACE_PAGE_PROPS].concat((0, _keys2.default)(pageActions));

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];


    if (!(0, _includes2.default)(actionTypes, action.type)) {
      return state;
    }

    var _action$payload = action.payload;
    var path = _action$payload.path;
    var props = _action$payload.props;


    if (path[0] === state.key) {
      switch (action.type) {
        case SET_PAGE_PROPS:
          return (0, _pagesCore.setPageProps)((0, _cloneDeep2.default)(state), (0, _drop2.default)(path), props);
        case REPLACE_PAGE_PROPS:
          return (0, _pagesCore.replacePageProps)((0, _cloneDeep2.default)(state), (0, _drop2.default)(path), props);
        default:
          if (action.type in pageActions) {
            var transformer = pageActions[action.type];
            return applyTransformer(transformer, (0, _cloneDeep2.default)(state), action);
          }
          return state;
      }
    }

    return state;
  };
}
