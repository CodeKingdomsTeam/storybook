"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _components = require("@storybook/components");

var ObjectType =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ObjectType, _Component);

  function ObjectType() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ObjectType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ObjectType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
      var value = e.target.value;
      var stateJson = _this.state.json;
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;

      try {
        var json = JSON.parse(value.trim());

        _this.setState({
          value: value,
          json: json,
          failed: false
        });

        if ((0, _fastDeepEqual.default)(knob.value, stateJson)) {
          onChange(json);
        }
      } catch (err) {
        _this.setState({
          value: value,
          failed: true
        });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(ObjectType, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          value = _this$state.value,
          failed = _this$state.failed;
      return _react.default.createElement(_components.Textarea, {
        valid: failed ? 'error' : null,
        value: value,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (!state || !(0, _fastDeepEqual.default)(props.knob.value, state.json)) {
        try {
          return {
            value: JSON.stringify(props.knob.value, null, 2),
            failed: false,
            json: props.knob.value
          };
        } catch (e) {
          return {
            value: 'Object cannot be stringified',
            failed: true
          };
        }
      }

      return null;
    }
  }]);
  return ObjectType;
}(_react.Component);

ObjectType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array])
  }).isRequired,
  onChange: _propTypes.default.func.isRequired
};

ObjectType.serialize = function (object) {
  return JSON.stringify(object);
};

ObjectType.deserialize = function (value) {
  return value ? JSON.parse(value) : {};
};

(0, _reactLifecyclesCompat.polyfill)(ObjectType);
var _default = ObjectType;
exports.default = _default;