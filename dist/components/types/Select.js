"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _components = require("@storybook/components");

var SelectType = function SelectType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  var options = knob.options;
  var entries = Array.isArray(options) ? options.reduce(function (acc, k) {
    return Object.assign(acc, (0, _defineProperty2.default)({}, k, k));
  }, {}) : options;
  var selectedKey = Object.keys(entries).find(function (k) {
    return entries[k] === knob.value;
  });
  return _react.default.createElement(_components.Select, {
    value: selectedKey,
    onChange: function onChange(e) {
      _onChange(entries[e.target.value]);
    },
    size: "flex"
  }, Object.entries(entries).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
        key = _ref3[0];

    return _react.default.createElement("option", {
      key: key,
      value: key
    }, key);
  }));
};

SelectType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
SelectType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.any,
    options: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
  }),
  onChange: _propTypes.default.func
};

SelectType.serialize = function (value) {
  return value;
};

SelectType.deserialize = function (value) {
  return value;
};

var _default = SelectType;
exports.default = _default;