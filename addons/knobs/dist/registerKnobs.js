"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerKnobs = registerKnobs;
exports.manager = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _KnobManager = _interopRequireDefault(require("./KnobManager"));

var manager = new _KnobManager.default();
exports.manager = manager;
var knobStore = manager.knobStore;

function forceReRender() {
  _addons.default.getChannel().emit(_coreEvents.default.FORCE_RE_RENDER);
}

function setPaneKnobs() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();

  var channel = _addons.default.getChannel();

  channel.emit('addon:knobs:setKnobs', {
    knobs: knobStore.getAll(),
    timestamp: timestamp
  });
}

function knobChanged(change) {
  var name = change.name,
      value = change.value; // Update the related knob and it's value.

  var knobOptions = knobStore.get(name);
  knobOptions.value = value;
  knobStore.markAllUnused();
  forceReRender();
}

function knobClicked(clicked) {
  var knobOptions = knobStore.get(clicked.name);
  knobOptions.callback();
  forceReRender();
}

function resetKnobs() {
  knobStore.reset();
  forceReRender();
  setPaneKnobs(false);
}

function disconnectCallbacks() {
  var channel = _addons.default.getChannel();

  channel.removeListener('addon:knobs:knobChange', knobChanged);
  channel.removeListener('addon:knobs:knobClick', knobClicked);
  channel.removeListener('addon:knobs:reset', resetKnobs);
  knobStore.unsubscribe(setPaneKnobs);
}

function connectCallbacks() {
  var channel = _addons.default.getChannel();

  channel.on('addon:knobs:knobChange', knobChanged);
  channel.on('addon:knobs:knobClick', knobClicked);
  channel.on('addon:knobs:reset', resetKnobs);
  knobStore.subscribe(setPaneKnobs);
  return disconnectCallbacks;
}

function registerKnobs() {
  _addons.default.getChannel().emit(_coreEvents.default.REGISTER_SUBSCRIPTION, connectCallbacks);
}