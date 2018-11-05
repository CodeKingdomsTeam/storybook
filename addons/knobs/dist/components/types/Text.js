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

var _components = require("@storybook/components");

var TextType =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TextType, _React$Component);

  function TextType() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TextType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TextType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;
      onChange(value);
    });
    return _this;
  }

  (0, _createClass2.default)(TextType, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var knob = this.props.knob;
      return nextProps.knob.value !== knob.value;
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      return _react.default.createElement(_components.Textarea, {
        id: knob.name,
        value: knob.value,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }]);
  return TextType;
}(_react.default.Component);

TextType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
TextType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.string
  }),
  onChange: _propTypes.default.func
};

TextType.serialize = function (value) {
  return value;
};

TextType.deserialize = function (value) {
  return value;
};

var _default = TextType;
exports.default = _default;