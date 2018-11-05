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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var styles = {
  label: {
    fontSize: 11,
    padding: '5px'
  },
  group: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
};

var RadiosType =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RadiosType, _Component);

  function RadiosType() {
    (0, _classCallCheck2.default)(this, RadiosType);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RadiosType).apply(this, arguments));
  }

  (0, _createClass2.default)(RadiosType, [{
    key: "renderRadioButtonList",
    value: function renderRadioButtonList(_ref) {
      var _this = this;

      var options = _ref.options;

      if (Array.isArray(options)) {
        return options.map(function (val) {
          return _this.renderRadioButton(val, val);
        });
      }

      return Object.keys(options).map(function (key) {
        return _this.renderRadioButton(key, options[key]);
      });
    }
  }, {
    key: "renderRadioButton",
    value: function renderRadioButton(label, value) {
      var opts = {
        label: label,
        value: value
      };
      var _this$props = this.props,
          _onChange = _this$props.onChange,
          knob = _this$props.knob;
      var name = knob.name;
      var id = "".concat(name, "-").concat(opts.value);
      return _react.default.createElement("div", {
        key: id
      }, _react.default.createElement("input", {
        type: "radio",
        id: id,
        name: name,
        value: opts.value,
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        },
        checked: value === knob.value
      }), _react.default.createElement("label", {
        style: styles.label,
        htmlFor: id
      }, label));
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      return _react.default.createElement("div", {
        style: styles.group
      }, this.renderRadioButtonList(knob));
    }
  }]);
  return RadiosType;
}(_react.Component);

RadiosType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
RadiosType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.string,
    options: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
  }),
  onChange: _propTypes.default.func
};

RadiosType.serialize = function (value) {
  return value;
};

RadiosType.deserialize = function (value) {
  return value;
};

var _default = RadiosType;
exports.default = _default;