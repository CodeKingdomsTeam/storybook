"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

function formatArray(value, separator) {
  if (value === '') {
    return [];
  }

  return value.split(separator);
}

var ArrayType =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ArrayType, _React$Component);

  function ArrayType() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ArrayType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ArrayType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;
      var value = e.target.value;
      var newVal = formatArray(value, knob.separator);
      onChange(newVal);
    });
    return _this;
  }

  (0, _createClass2.default)(ArrayType, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var knob = this.props.knob;
      return nextProps.knob.value !== knob.value;
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      var value = knob.value.join(knob.separator);
      return _react.default.createElement(_components.Textarea, {
        id: knob.name,
        value: value,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }]);
  return ArrayType;
}(_react.default.Component);

ArrayType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
ArrayType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.array,
    separator: _propTypes.default.string
  }),
  onChange: _propTypes.default.func
};

ArrayType.serialize = function (value) {
  return value;
};

ArrayType.deserialize = function (value) {
  if (Array.isArray(value)) return value;
  return Object.keys(value).sort().reduce(function (array, key) {
    return (0, _toConsumableArray2.default)(array).concat([value[key]]);
  }, []);
};

var _default = ArrayType;
exports.default = _default;