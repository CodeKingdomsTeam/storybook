"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var Input =
/*#__PURE__*/
(0, _styled.default)("input", {
  target: "e14li1qr0"
})({
  display: 'table-cell',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  height: 21,
  outline: 'none',
  border: '1px solid #ececec',
  fontSize: '12px',
  color: '#555'
});

var BooleanType = function BooleanType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  return _react.default.createElement(Input, {
    id: knob.name,
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: knob.value
  });
};

BooleanType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
BooleanType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.bool
  }),
  onChange: _propTypes.default.func
};

BooleanType.serialize = function (value) {
  return value ? String(value) : null;
};

BooleanType.deserialize = function (value) {
  return value === 'true';
};

var _default = BooleanType;
exports.default = _default;