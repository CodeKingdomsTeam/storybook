"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _qs = _interopRequireDefault(require("qs"));

var _global = require("global");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _components = require("@storybook/components");

var _types = _interopRequireDefault(require("./types"));

var _PropForm = _interopRequireDefault(require("./PropForm"));

var getTimestamp = function getTimestamp() {
  return +new Date();
};

var DEFAULT_GROUP_ID = 'ALL';
var PanelWrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1hohnps0"
})({
  height: '100%',
  overflow: 'auto',
  width: '100%'
});

var Panel =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Panel, _PureComponent);

  function Panel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Panel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Panel).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setOptions", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        timestamps: false
      };
      _this.options = options;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setKnobs", function (_ref) {
      var knobs = _ref.knobs,
          timestamp = _ref.timestamp;
      var queryParams = {};
      var _this$props = _this.props,
          api = _this$props.api,
          channel = _this$props.channel;

      if (!_this.options.timestamps || !timestamp || _this.lastEdit <= timestamp) {
        Object.keys(knobs).forEach(function (name) {
          var knob = knobs[name]; // For the first time, get values from the URL and set them.

          if (!_this.loadedFromUrl) {
            var urlValue = api.getQueryParam("knob-".concat(name));

            if (urlValue !== undefined) {
              // If the knob value present in url
              knob.value = _types.default[knob.type].deserialize(urlValue);
              channel.emit('addon:knobs:knobChange', knob);
            }
          } // set all knobsquery params to be deleted from URL


          queryParams["knob-".concat(name)] = null;
        });
        api.setQueryParams(queryParams);

        _this.setState({
          knobs: knobs
        });

        _this.loadedFromUrl = true;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "reset", function () {
      var channel = _this.props.channel;
      channel.emit('addon:knobs:reset');
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "copy", function () {
      var location = _global.document.location;

      var query = _qs.default.parse(location.search.replace('?', ''));

      var knobs = _this.state.knobs;
      Object.entries(knobs).forEach(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            name = _ref3[0],
            knob = _ref3[1];

        query["knob-".concat(name)] = _types.default[knob.type].serialize(knob.value);
      });
      (0, _copyToClipboard.default)("".concat(location.origin + location.pathname, "?").concat(_qs.default.stringify(query))); // TODO: show some notification of this
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "emitChange", function (changedKnob) {
      var channel = _this.props.channel;
      channel.emit('addon:knobs:knobChange', changedKnob);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (changedKnob) {
      _this.lastEdit = getTimestamp();
      var knobs = _this.state.knobs;
      var name = changedKnob.name;
      var newKnobs = (0, _objectSpread2.default)({}, knobs);
      newKnobs[name] = (0, _objectSpread2.default)({}, newKnobs[name], changedKnob);

      _this.setState({
        knobs: newKnobs
      }, _this.emitChange(changedKnob));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (knob) {
      var channel = _this.props.channel;
      channel.emit('addon:knobs:knobClick', knob);
    });
    _this.state = {
      knobs: {}
    };
    _this.options = {};
    _this.lastEdit = getTimestamp();
    _this.loadedFromUrl = false;
    return _this;
  }

  (0, _createClass2.default)(Panel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          channel = _this$props2.channel,
          api = _this$props2.api;
      channel.on('addon:knobs:setKnobs', this.setKnobs);
      channel.on('addon:knobs:setOptions', this.setOptions);
      this.stopListeningOnStory = api.onStory(function () {
        _this2.setState({
          knobs: {}
        });

        channel.emit('addon:knobs:reset');
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var channel = this.props.channel;
      channel.removeListener('addon:knobs:setKnobs', this.setKnobs);
      this.stopListeningOnStory();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var knobs = this.state.knobs;
      var active = this.props.active;

      if (!active) {
        return null;
      }

      var groups = {};
      var groupIds = [];
      var knobsArray = Object.keys(knobs).filter(function (key) {
        return knobs[key].used;
      });
      knobsArray.filter(function (key) {
        return knobs[key].groupId;
      }).forEach(function (key) {
        var knobKeyGroupId = knobs[key].groupId;
        groupIds.push(knobKeyGroupId);
        groups[knobKeyGroupId] = {
          render: function render(_ref4) {
            var groupActive = _ref4.active,
                selected = _ref4.selected;
            return _react.default.createElement(_components.TabWrapper, {
              active: groupActive || selected === DEFAULT_GROUP_ID
            }, _react.default.createElement(_PropForm.default, {
              knobs: knobsArray.filter(function (knob) {
                return knob.groupId === knobKeyGroupId;
              }),
              onFieldChange: _this3.handleChange,
              onFieldClick: _this3.handleClick
            }));
          },
          title: knobKeyGroupId
        };
      });
      groups[DEFAULT_GROUP_ID] = {
        render: function render() {
          return null;
        },
        title: DEFAULT_GROUP_ID
      };
      knobsArray = knobsArray.map(function (key) {
        return knobs[key];
      });

      if (knobsArray.length === 0) {
        return _react.default.createElement(_components.Placeholder, null, "NO KNOBS");
      }

      return _react.default.createElement(PanelWrapper, null, groupIds.length > 0 ? _react.default.createElement(_components.TabsState, null, Object.entries(groups).map(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        return _react.default.createElement("div", {
          id: k,
          title: v.title
        }, v.render);
      })) : _react.default.createElement(_PropForm.default, {
        knobs: knobsArray,
        onFieldChange: this.handleChange,
        onFieldClick: this.handleClick
      }), _react.default.createElement(_components.ActionBar, null, _react.default.createElement(_components.ActionButton, {
        onClick: this.copy
      }, "COPY"), _react.default.createElement(_components.ActionButton, {
        onClick: this.reset
      }, "RESET")));
    }
  }]);
  return Panel;
}(_react.PureComponent);

exports.default = Panel;
Panel.propTypes = {
  active: _propTypes.default.bool.isRequired,
  onReset: _propTypes.default.object,
  // eslint-disable-line
  channel: _propTypes.default.shape({
    emit: _propTypes.default.func,
    on: _propTypes.default.func,
    removeListener: _propTypes.default.func
  }).isRequired,
  api: _propTypes.default.shape({
    onStory: _propTypes.default.func,
    getQueryParam: _propTypes.default.func,
    setQueryParams: _propTypes.default.func
  }).isRequired
};