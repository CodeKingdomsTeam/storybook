"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _components = require("@storybook/components");

var base = {
  boxSizing: 'border-box',
  height: '25px',
  outline: 'none',
  border: '1px solid #f7f4f4',
  borderRadius: 2,
  fontSize: 11,
  padding: '5px',
  color: '#444'
};
var RangeInput =
/*#__PURE__*/
(0, _styled.default)("input", {
  target: "ei4p2al0"
})(base, {
  display: 'table-cell',
  flexGrow: 1
});
var RangeLabel =
/*#__PURE__*/
(0, _styled.default)("span", {
  target: "ei4p2al1"
})({
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: 12,
  whiteSpace: 'nowrap'
});
var RangeWrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "ei4p2al2"
})({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

var NumberType =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(NumberType, _React$Component);

  function NumberType() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NumberType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NumberType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;
      var parsedValue = Number(value);

      if (Number.isNaN(parsedValue) || value === '') {
        parsedValue = null;
      }

      onChange(parsedValue);
    });
    return _this;
  }

  (0, _createClass2.default)(NumberType, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var knob = this.props.knob;
      return nextProps.knob.value !== knob.value;
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      return knob.range ? _react.default.createElement(RangeWrapper, null, _react.default.createElement(RangeLabel, null, knob.min), _react.default.createElement(RangeInput, {
        value: knob.value,
        type: "range",
        min: knob.min,
        max: knob.max,
        step: knob.step,
        onChange: this.handleChange
      }), _react.default.createElement(RangeLabel, null, "".concat(knob.value, " / ").concat(knob.max))) : _react.default.createElement(_components.Input, {
        value: knob.value,
        type: "number",
        min: knob.min,
        max: knob.max,
        step: knob.step,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }]);
  return NumberType;
}(_react.default.Component);

NumberType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.number,
    range: _propTypes.default.bool,
    min: _propTypes.default.number,
    max: _propTypes.default.number,
    step: _propTypes.default.number
  }).isRequired,
  onChange: _propTypes.default.func.isRequired
};

NumberType.serialize = function (value) {
  return value === null || value === undefined ? '' : String(value);
};

NumberType.deserialize = function (value) {
  return value === '' ? null : parseFloat(value);
};

var _default = NumberType;
exports.default = _default;