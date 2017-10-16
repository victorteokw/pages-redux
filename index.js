'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPLACE_PAGE_PROPS = exports.SET_PAGE_PROPS = undefined;
exports.createRootPageReducer = createRootPageReducer;
exports.definePageAction = definePageAction;

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _drop = require('lodash/drop');

var _drop2 = _interopRequireDefault(_drop);

var _pagesCore = require('pages-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handledActions = [SET_PAGE_PROPS, REPLACE_PAGE_PROPS];
var transformers = {};

var SET_PAGE_PROPS = exports.SET_PAGE_PROPS = 'SET_PAGE_PROPS';
var REPLACE_PAGE_PROPS = exports.REPLACE_PAGE_PROPS = 'REPLACE_PAGE_PROPS';

function createRootPageReducer(rootPageState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : rootPageState;
    var action = arguments[1];

    // Just return state if the action is not a pages action.
    if (!(0, _includes2.default)(handledActions, action.type)) {
      return state;
    }
    var root = state,
        _action$payload = action.payload,
        path = _action$payload.path,
        props = _action$payload.props;
    if (path[0] !== state.key) {
      return state;
    }
    if (action.type === SET_PAGE_PROPS) {
      return (0, _pagesCore.setPageProps)(root, (0, _drop2.default)(path), props);
    } else if (action.type === REPLACE_PAGE_PROPS) {
      return (0, _pagesCore.replacePageProps)(root, (0, _drop2.default)(path), props);
    } else {
      var transformer = transformers[action.type];
      return (0, _pagesCore.transformPageProps)(root, (0, _drop2.default)(path), function (old) {
        return transformer(old, action);
      });
    }
  };
}

function definePageAction(type, transformer) {
  if ((0, _includes2.default)(handledActions, type)) {
    throw 'Redefine action ' + type;
  }
  handledActions.push(type);
  transformers[type] = transformer;
}
