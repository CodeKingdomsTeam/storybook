"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var callArg = function callArg(fn) {
  return fn();
};

var callAll = function callAll(fns) {
  return fns.forEach(callArg);
};

var KnobStore =
/*#__PURE__*/
function () {
  function KnobStore() {
    (0, _classCallCheck2.default)(this, KnobStore);
    this.store = {};
    this.callbacks = [];
  }

  (0, _createClass2.default)(KnobStore, [{
    key: "has",
    value: function has(key) {
      return this.store[key] !== undefined;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.store[key] = value;
      this.store[key].used = true;
      this.store[key].groupId = value.groupId; // debounce the execution of the callbacks for 50 milliseconds

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(callAll, 50, this.callbacks);
    }
  }, {
    key: "get",
    value: function get(key) {
      var knob = this.store[key];

      if (knob) {
        knob.used = true;
      }

      return knob;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.store;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.store = {};
    }
  }, {
    key: "markAllUnused",
    value: function markAllUnused() {
      var _this = this;

      Object.keys(this.store).forEach(function (knobName) {
        _this.store[knobName].used = false;
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(cb) {
      this.callbacks.push(cb);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(cb) {
      var index = this.callbacks.indexOf(cb);
      this.callbacks.splice(index, 1);
    }
  }]);
  return KnobStore;
}();

exports.default = KnobStore;