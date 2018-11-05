"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _enzyme = require("enzyme");

var _KnobManager = _interopRequireDefault(require("./KnobManager"));

// eslint-disable-line
describe('KnobManager', function () {
  describe('knob()', function () {
    describe('when the knob is present in the knobStore', function () {
      var testManager = new _KnobManager.default();
      beforeEach(function () {
        testManager.knobStore = {
          set: jest.fn(),
          get: function get() {
            return {
              defaultValue: 'default value',
              value: 'current value',
              name: 'foo'
            };
          }
        };
      });
      it('should return the existing knob value when defaults match', function () {
        var defaultKnob = {
          name: 'foo',
          value: 'default value'
        };
        var knob = testManager.knob('foo', defaultKnob);
        expect(knob).toEqual('current value');
        expect(testManager.knobStore.set).not.toHaveBeenCalled();
      });
      it('should return the new default knob value when default has changed', function () {
        var defaultKnob = {
          name: 'foo',
          value: 'changed default value'
        };
        testManager.knob('foo', defaultKnob);
        var newKnob = (0, _objectSpread2.default)({}, defaultKnob, {
          defaultValue: defaultKnob.value
        });
        expect(testManager.knobStore.set).toHaveBeenCalledWith('foo', newKnob);
      });
    });
    describe('when the knob is not present in the knobStore', function () {
      var testManager = new _KnobManager.default();
      beforeEach(function () {
        testManager.knobStore = {
          set: jest.fn(),
          get: jest.fn()
        };
        testManager.knobStore.get.mockImplementationOnce(function () {
          return undefined;
        }).mockImplementationOnce(function () {
          return 'normal value';
        });
      });
      it('should return the new default knob value when default has changed', function () {
        var defaultKnob = {
          name: 'foo',
          value: 'normal value'
        };
        testManager.knob('foo', defaultKnob);
        var newKnob = (0, _objectSpread2.default)({}, defaultKnob, {
          defaultValue: defaultKnob.value
        });
        expect(testManager.knobStore.set).toHaveBeenCalledWith('foo', newKnob);
      });
    });
  });
});