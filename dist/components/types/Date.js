"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _components = require("@storybook/components");

var FlexSpaced =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1q0vczo0"
})({
  flex: 1,
  display: 'flex',
  '& > *': {
    marginLeft: 10
  },
  '& > *:first-child': {
    marginLeft: 0
  }
});
var FlexInput =
/*#__PURE__*/
(0, _styled.default)(_components.Input, {
  target: "e1q0vczo1"
})({
  flex: 1
});

var formatDate = function formatDate(date) {
  var year = "000".concat(date.getFullYear()).slice(-4);
  var month = "0".concat(date.getMonth() + 1).slice(-2);
  var day = "0".concat(date.getDate()).slice(-2);
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var formatTime = function formatTime(date) {
  var hours = "0".concat(date.getHours()).slice(-2);
  var minutes = "0".concat(date.getMinutes()).slice(-2);
  return "".concat(hours, ":").concat(minutes);
};

var DateType =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DateType, _Component);

  function DateType() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DateType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DateType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      valid: undefined
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDateChange", function (e) {
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;

      var _assertThisInitialize = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
          state = _assertThisInitialize.state;

      var valid = false;

      var _e$target$value$split = e.target.value.split('-'),
          _e$target$value$split2 = (0, _slicedToArray2.default)(_e$target$value$split, 3),
          year = _e$target$value$split2[0],
          month = _e$target$value$split2[1],
          day = _e$target$value$split2[2];

      var result = new Date(knob.value);

      if (result.getTime()) {
        result.setFullYear(parseInt(year, 10));
        result.setMonth(parseInt(month, 10) - 1);
        result.setDate(parseInt(day, 10));

        if (result.getTime()) {
          valid = true;
          onChange(result.getTime());
        }
      }

      if (valid !== state.valid) {
        _this.setState({
          valid: valid
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onTimeChange", function (e) {
      var _this$props2 = _this.props,
          knob = _this$props2.knob,
          onChange = _this$props2.onChange;

      var _assertThisInitialize2 = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
          state = _assertThisInitialize2.state;

      var valid = false;

      var _e$target$value$split3 = e.target.value.split(':'),
          _e$target$value$split4 = (0, _slicedToArray2.default)(_e$target$value$split3, 2),
          hours = _e$target$value$split4[0],
          minutes = _e$target$value$split4[1];

      var result = new Date(knob.value);

      if (result.getTime()) {
        result.setHours(parseInt(hours, 10));
        result.setMinutes(parseInt(minutes, 10));

        if (result.getTime()) {
          onChange(result.getTime());
          valid = true;
        }
      }

      if (valid !== state.valid) {
        _this.setState({
          valid: valid
        });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(DateType, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var knob = this.props.knob;
      var valid = this.state.valid;
      var value = new Date(knob.value);

      if (valid !== false) {
        this.dateInput.value = formatDate(value);
        this.timeInput.value = formatTime(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var knob = this.props.knob;
      var name = knob.name;
      var valid = this.state.valid;
      return name ? _react.default.createElement(FlexSpaced, {
        style: {
          display: 'flex'
        }
      }, _react.default.createElement(FlexInput, {
        type: "date",
        max: "9999-12-31" // I do this because of a rendering bug in chrome
        ,
        ref: function ref(el) {
          _this2.dateInput = el;
        },
        id: "".concat(name, "date"),
        onChange: this.onDateChange
      }), _react.default.createElement(FlexInput, {
        type: "time",
        id: "".concat(name, "time"),
        ref: function ref(el) {
          _this2.timeInput = el;
        },
        onChange: this.onTimeChange
      }), !valid ? _react.default.createElement("div", null, "invalid") : null) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {
      return {
        valid: true
      };
    }
  }]);
  return DateType;
}(_react.Component);

DateType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
DateType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.number
  }),
  onChange: _propTypes.default.func
};

DateType.serialize = function (value) {
  return new Date(value).getTime() || new Date().getTime();
};

DateType.deserialize = function (value) {
  return new Date(value).getTime() || new Date().getTime();
};

var _default = DateType;
exports.default = _default;