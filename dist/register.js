"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _Panel = _interopRequireDefault(require("./components/Panel"));

_addons.default.register('storybooks/storybook-addon-knobs', function (api) {
  var channel = _addons.default.getChannel();

  _addons.default.addPanel('storybooks/storybook-addon-knobs', {
    title: 'Knobs',
    // eslint-disable-next-line react/prop-types
    render: function render(_ref) {
      var active = _ref.active;
      return _react.default.createElement(_Panel.default, {
        channel: channel,
        api: api,
        key: "knobs-panel",
        active: active
      });
    }
  });
});