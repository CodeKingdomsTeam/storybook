"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.knob = knob;
exports.text = text;
exports.boolean = boolean;
exports.number = number;
exports.color = color;
exports.object = object;
exports.select = select;
exports.radios = radios;
exports.array = array;
exports.date = date;
exports.button = button;
exports.files = files;
exports.withKnobsOptions = exports.withKnobs = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _registerKnobs = require("./registerKnobs");

function knob(name, options) {
  return _registerKnobs.manager.knob(name, options);
}

function text(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'text',
    value: value,
    groupId: groupId
  });
}

function boolean(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'boolean',
    value: value,
    groupId: groupId
  });
}

function number(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  var rangeDefaults = {
    min: 0,
    max: 10,
    step: 1
  };
  var mergedOptions = options.range ? (0, _objectSpread2.default)({}, rangeDefaults, options) : options;
  var finalOptions = (0, _objectSpread2.default)({}, mergedOptions, {
    type: 'number',
    value: value,
    groupId: groupId
  });
  return _registerKnobs.manager.knob(name, finalOptions);
}

function color(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'color',
    value: value,
    groupId: groupId
  });
}

function object(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'object',
    value: value,
    groupId: groupId
  });
}

function select(name, options, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'select',
    selectV2: true,
    options: options,
    value: value,
    groupId: groupId
  });
}

function radios(name, options, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'radios',
    options: options,
    value: value,
    groupId: groupId
  });
}

function array(name, value) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return _registerKnobs.manager.knob(name, {
    type: 'array',
    value: value,
    separator: separator,
    groupId: groupId
  });
}

function date(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var groupId = arguments.length > 2 ? arguments[2] : undefined;
  var proxyValue = value ? value.getTime() : null;
  return _registerKnobs.manager.knob(name, {
    type: 'date',
    value: proxyValue,
    groupId: groupId
  });
}

function button(name, callback, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'button',
    callback: callback,
    hideLabel: true,
    groupId: groupId
  });
}

function files(name, accept) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return _registerKnobs.manager.knob(name, {
    type: 'files',
    accept: accept,
    value: value
  });
}

var defaultOptions = {
  escapeHTML: true
};
var withKnobs = (0, _addons.makeDecorator)({
  name: 'withKnobs',
  parameterName: 'knobs',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var storyOptions = parameters || options;
    var allOptions = (0, _objectSpread2.default)({}, defaultOptions, storyOptions);

    _registerKnobs.manager.setOptions(allOptions);

    var channel = _addons.default.getChannel();

    _registerKnobs.manager.setChannel(channel);

    channel.emit('addon:knobs:setOptions', allOptions);
    (0, _registerKnobs.registerKnobs)();
    return getStory(context);
  }
});
exports.withKnobs = withKnobs;
var withKnobsOptions = (0, _utilDeprecate.default)(withKnobs, 'withKnobsOptions is deprecated. Instead, you can pass options into withKnobs(options) directly, or use the knobs parameter.');
exports.withKnobsOptions = withKnobsOptions;