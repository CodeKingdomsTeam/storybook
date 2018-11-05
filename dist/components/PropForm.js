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

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _components = require("@storybook/components");

var _types = _interopRequireDefault(require("./types"));

var Form =
/*#__PURE__*/
(0, _styled.default)("form", {
  target: "e9jwy170"
})({
  boxSizing: 'border-box',
  width: '100%'
});

var InvalidType = function InvalidType() {
  return _react.default.createElement("span", null, "Invalid Type");
};

var PropForm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PropForm, _Component);

  function PropForm() {
    (0, _classCallCheck2.default)(this, PropForm);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PropForm).apply(this, arguments));
  }

  (0, _createClass2.default)(PropForm, [{
    key: "makeChangeHandler",
    value: function makeChangeHandler(name, type) {
      var onFieldChange = this.props.onFieldChange;
      return function (value) {
        var change = {
          name: name,
          type: type,
          value: value
        };
        onFieldChange(change);
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          knobs = _this$props.knobs,
          onFieldClick = _this$props.onFieldClick;
      return _react.default.createElement(Form, null, knobs.map(function (knob) {
        var changeHandler = _this.makeChangeHandler(knob.name, knob.type);

        var InputType = _types.default[knob.type] || InvalidType;
        return _react.default.createElement(_components.Field, {
          key: knob.name,
          label: !knob.hideLabel && "".concat(knob.name)
        }, _react.default.createElement(InputType, {
          knob: knob,
          onChange: changeHandler,
          onClick: onFieldClick
        }));
      }));
    }
  }]);
  return PropForm;
}(_react.Component);

exports.default = PropForm;
PropForm.displayName = 'PropForm';
PropForm.propTypes = {
  knobs: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.any
  })).isRequired,
  onFieldChange: _propTypes.default.func.isRequired,
  onFieldClick: _propTypes.default.func.isRequired
};