"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _global = require("global");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _components = require("@storybook/components");

var FileInput =
/*#__PURE__*/
(0, _styled.default)(_components.Input, {
  target: "e1npm7sq0"
})({
  paddingTop: 4
});

function fileReaderPromise(file) {
  return new Promise(function (resolve) {
    var fileReader = new _global.FileReader();

    fileReader.onload = function (e) {
      return resolve(e.currentTarget.result);
    };

    fileReader.readAsDataURL(file);
  });
}

var FilesType = function FilesType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  return _react.default.createElement(FileInput, {
    type: "file",
    multiple: true,
    onChange: function onChange(e) {
      return Promise.all(Array.from(e.target.files).map(fileReaderPromise)).then(_onChange);
    },
    accept: knob.accept,
    size: "flex"
  });
};

FilesType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
FilesType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string
  }),
  onChange: _propTypes.default.func
};

FilesType.serialize = function () {
  return undefined;
};

FilesType.deserialize = function () {
  return undefined;
};

var _default = FilesType;
exports.default = _default;