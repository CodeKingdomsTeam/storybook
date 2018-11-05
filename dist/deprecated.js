"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "knob", {
  enumerable: true,
  get: function get() {
    return _.knob;
  }
});
Object.defineProperty(exports, "text", {
  enumerable: true,
  get: function get() {
    return _.text;
  }
});
Object.defineProperty(exports, "boolean", {
  enumerable: true,
  get: function get() {
    return _.boolean;
  }
});
Object.defineProperty(exports, "number", {
  enumerable: true,
  get: function get() {
    return _.number;
  }
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function get() {
    return _.color;
  }
});
Object.defineProperty(exports, "object", {
  enumerable: true,
  get: function get() {
    return _.object;
  }
});
Object.defineProperty(exports, "array", {
  enumerable: true,
  get: function get() {
    return _.array;
  }
});
Object.defineProperty(exports, "date", {
  enumerable: true,
  get: function get() {
    return _.date;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function get() {
    return _.select;
  }
});
Object.defineProperty(exports, "files", {
  enumerable: true,
  get: function get() {
    return _.files;
  }
});
Object.defineProperty(exports, "button", {
  enumerable: true,
  get: function get() {
    return _.button;
  }
});
exports.withKnobsOptions = exports.withKnobs = exports.selectV2 = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _ = require(".");

var selectV2 = (0, _utilDeprecate.default)(_.select, 'selectV2 has been renamed to select');
exports.selectV2 = selectV2;
var withKnobs = (0, _utilDeprecate.default)(_.withKnobs, "addon-knobs: framework-specific imports are deprecated, just use `import {withKnobs} from '@storybook/addon-knobs`");
exports.withKnobs = withKnobs;
var withKnobsOptions = (0, _utilDeprecate.default)(_.withKnobsOptions, "addon-knobs: framework-specific imports are deprecated, just use `import {withKnobsOptions} from '@storybook/addon-knobs`");
exports.withKnobsOptions = withKnobsOptions;