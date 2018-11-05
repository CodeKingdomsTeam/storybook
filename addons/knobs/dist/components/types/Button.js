"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var ButtonType = function ButtonType(_ref) {
  var knob = _ref.knob,
      _onClick = _ref.onClick;
  return _react.default.createElement(_components.Button, {
    type: "button",
    onClick: function onClick() {
      return _onClick(knob);
    }
  }, knob.name);
};

ButtonType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string
  }).isRequired,
  onClick: _propTypes.default.func.isRequired
};

ButtonType.serialize = function () {
  return undefined;
};

ButtonType.deserialize = function () {
  return undefined;
};

var _default = ButtonType;
exports.default = _default;