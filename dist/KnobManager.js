"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _escapeHtml = _interopRequireDefault(require("escape-html"));

var _KnobStore = _interopRequireDefault(require("./KnobStore"));

/* eslint no-underscore-dangle: 0 */
// This is used by _mayCallChannel to determine how long to wait to before triggering a panel update
var PANEL_UPDATE_INTERVAL = 400;

var escapeStrings = function escapeStrings(obj) {
  if (typeof obj === 'string') {
    return (0, _escapeHtml.default)(obj);
  }

  if (obj == null || (0, _typeof2.default)(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var newArray = obj.map(escapeStrings);
    var didChange = newArray.some(function (newValue, key) {
      return newValue !== obj[key];
    });
    return didChange ? newArray : obj;
  }

  return Object.entries(obj).reduce(function (acc, _ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        oldValue = _ref2[1];

    var newValue = escapeStrings(oldValue);
    return newValue === oldValue ? acc : (0, _objectSpread3.default)({}, acc, (0, _defineProperty2.default)({}, key, newValue));
  }, obj);
};

var KnobManager =
/*#__PURE__*/
function () {
  function KnobManager() {
    (0, _classCallCheck2.default)(this, KnobManager);
    this.knobStore = new _KnobStore.default();
    this.options = {};
  }

  (0, _createClass2.default)(KnobManager, [{
    key: "setChannel",
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
    key: "getKnobValue",
    value: function getKnobValue(_ref3) {
      var value = _ref3.value;
      return this.options.escapeHTML ? escapeStrings(value) : value;
    }
  }, {
    key: "knob",
    value: function knob(name, options) {
      this._mayCallChannel();

      var knobStore = this.knobStore;
      var existingKnob = knobStore.get(name); // We need to return the value set by the knob editor via this.
      // But, if the user changes the code for the defaultValue we should set
      // that value instead.

      if (existingKnob && (0, _fastDeepEqual.default)(options.value, existingKnob.defaultValue)) {
        return this.getKnobValue(existingKnob);
      }

      var defaultValue = options.value;
      var knobInfo = (0, _objectSpread3.default)({}, options, {
        name: name,
        defaultValue: defaultValue
      });
      knobStore.set(name, knobInfo);
      return this.getKnobValue(knobStore.get(name));
    }
  }, {
    key: "_mayCallChannel",
    value: function _mayCallChannel() {
      var _this = this;

      // Re rendering of the story may cause changes to the knobStore. Some new knobs maybe added and
      // Some knobs may go unused. So we need to update the panel accordingly. For example remove the
      // unused knobs from the panel. This function sends the `setKnobs` message to the channel
      // triggering a panel re-render.
      if (this.calling) {
        // If a call to channel has already registered ignore this call.
        // Once the previous call is completed all the changes to knobStore including the one that
        // triggered this, will be added to the panel.
        // This avoids emitting to the channel within very short periods of time.
        return;
      }

      this.calling = true;
      var timestamp = +new Date();
      setTimeout(function () {
        _this.calling = false; // emit to the channel and trigger a panel re-render

        if (_this.channel) {
          _this.channel.emit('addon:knobs:setKnobs', {
            knobs: _this.knobStore.getAll(),
            timestamp: timestamp
          });
        }
      }, PANEL_UPDATE_INTERVAL);
    }
  }]);
  return KnobManager;
}();

exports.default = KnobManager;