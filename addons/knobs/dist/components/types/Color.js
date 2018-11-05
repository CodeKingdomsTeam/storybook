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

var _global = require("global");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactColor = require("react-color");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _components = require("@storybook/components");

var Swatch =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1wf6gpk0"
})({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 3,
  width: 28
});
var Popover =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1wf6gpk1"
})({
  position: 'absolute',
  zIndex: '2'
});

var ColorType =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ColorType, _React$Component);

  function ColorType() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ColorType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ColorType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      displayColorPicker: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleWindowMouseDown", function (e) {
      var displayColorPicker = _this.state.displayColorPicker;

      if (!displayColorPicker || _this.popover.contains(e.target)) {
        return;
      }

      _this.setState({
        displayColorPicker: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function () {
      var displayColorPicker = _this.state.displayColorPicker;

      _this.setState({
        displayColorPicker: !displayColorPicker
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (color) {
      var onChange = _this.props.onChange;
      onChange("rgba(".concat(color.rgb.r, ",").concat(color.rgb.g, ",").concat(color.rgb.b, ",").concat(color.rgb.a, ")"));
    });
    return _this;
  }

  (0, _createClass2.default)(ColorType, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _global.document.addEventListener('mousedown', this.handleWindowMouseDown);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var knob = this.props.knob;
      var displayColorPicker = this.state.displayColorPicker;
      return nextProps.knob.value !== knob.value || nextState.displayColorPicker !== displayColorPicker;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _global.document.removeEventListener('mousedown', this.handleWindowMouseDown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var knob = this.props.knob;
      var displayColorPicker = this.state.displayColorPicker;
      var colorStyle = {
        background: knob.value
      };
      return _react.default.createElement(_components.Button, {
        type: "button",
        onClick: this.handleClick,
        size: "flex"
      }, knob.value, _react.default.createElement(Swatch, {
        style: colorStyle
      }), displayColorPicker ? _react.default.createElement(Popover, {
        innerRef: function innerRef(e) {
          _this2.popover = e;
        }
      }, _react.default.createElement(_reactColor.SketchPicker, {
        color: knob.value,
        onChange: this.handleChange
      })) : null);
    }
  }]);
  return ColorType;
}(_react.default.Component);

ColorType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.string
  }),
  onChange: _propTypes.default.func
};
ColorType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};

ColorType.serialize = function (value) {
  return value;
};

ColorType.deserialize = function (value) {
  return value;
};

var _default = ColorType;
exports.default = _default;