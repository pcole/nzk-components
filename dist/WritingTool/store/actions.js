'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.init = init;
exports.initPlaceholders = initPlaceholders;
exports.initWriting = initWriting;
exports.initConstraints = initConstraints;
exports.initPrompt = initPrompt;
exports.initSections = initSections;
exports.addSection = addSection;
exports.setWordCount = setWordCount;
exports.removeField = removeField;
exports.addField = addField;
exports.setFieldValue = setFieldValue;
exports.clear = clear;

var _writingTypePresets = require('../assets/writing-type-presets.json');

var _writingTypePresets2 = _interopRequireDefault(_writingTypePresets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function init(dispatch, settings) {
  if (settings.loadPresetSections === undefined) {
    settings.loadPresetSections = true;
  }

  var preset = _writingTypePresets2.default[settings.lang][settings.writingType];

  dispatch(initPlaceholders(dispatch, preset, settings));
  dispatch(initWriting(dispatch, preset, settings));
  dispatch(initConstraints(dispatch, preset, settings));
  dispatch(initPrompt(dispatch, preset, settings));
  dispatch(initSections(dispatch, preset, settings));

  return {
    type: 'INIT'
  };
}

function initPlaceholders(dispatch, preset) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$placeholders = _ref.placeholders,
      placeholders = _ref$placeholders === undefined ? {} : _ref$placeholders;

  return {
    type: 'SET_PLACEHOLDERS',
    payload: _extends({
      title: preset.titlePlaceholder,
      text: preset.textPlaceholder
    }, placeholders)
  };
}

function initWriting(dispatch, preset) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$writing = _ref2.writing,
      writing = _ref2$writing === undefined ? {} : _ref2$writing;

  return {
    type: 'SET_WRITING',
    payload: writing
  };
}

function initConstraints(dispatch, preset) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$constraints = _ref3.constraints,
      constraints = _ref3$constraints === undefined ? {} : _ref3$constraints;

  return {
    type: 'SET_CONSTRAINTS',
    payload: constraints
  };
}

function initPrompt(dispatch, preset) {
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref4$prompt = _ref4.prompt,
      prompt = _ref4$prompt === undefined ? {} : _ref4$prompt;

  return {
    type: 'SET_PROMPT',
    payload: _extends({
      icon: preset.icon,
      title: preset.planningPrompt
    }, prompt)
  };
}

function initSections(dispatch, preset, settings) {
  var sections = [];

  if (settings.loadPresetSections) {
    sections.push.apply(sections, _toConsumableArray(preset.planning));
  }

  if (settings.sections) {
    settings.sections.forEach(function (section) {
      if (section.prepend) {
        sections.unshift(section);
      } else {
        sections.push(section);
      }
    });
  }

  sections.map(function (section) {
    dispatch(addSection(section));
  });

  return {
    type: 'INIT_SECTIONS'
  };
}

function addSection(section) {
  return {
    type: 'ADD_SECTION',
    payload: {
      title: section.title,
      fieldType: section.fieldType,
      userCanAddFields: section.userCanAddFields,
      fieldsAreRemovable: section.fieldsAreRemovable,
      fields: [].concat(_toConsumableArray(Array(section.numberOfFields))).map(function (field, index) {
        return {
          index: index,
          value: '',
          type: section.fieldType,
          removable: section.fieldsAreRemovable
        };
      })
    }
  };
}

function setWordCount(wordCount) {
  return {
    type: 'SET_WORD_COUNT',
    payload: wordCount
  };
}

function removeField(sectionIndex, fieldIndex) {
  return {
    type: 'REMOVE_FIELD',
    payload: { sectionIndex: sectionIndex, fieldIndex: fieldIndex }
  };
}

function addField(sectionIndex) {
  return {
    type: 'ADD_FIELD',
    payload: { sectionIndex: sectionIndex }
  };
}

function setFieldValue(sectionIndex, fieldIndex, value) {
  return {
    type: 'SET_FIELD_VALUE',
    payload: { sectionIndex: sectionIndex, fieldIndex: fieldIndex, value: value }
  };
}

function clear() {
  return {
    type: 'CLEAR'
  };
}