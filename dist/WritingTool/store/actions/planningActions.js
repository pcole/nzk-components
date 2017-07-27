'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePreset = usePreset;
exports.useCustomPreset = useCustomPreset;
exports.setWritingType = setWritingType;
exports.setInformations = setInformations;
exports.savePlanningLocalStorage = savePlanningLocalStorage;
exports.loadPlanningLocalstorage = loadPlanningLocalstorage;
exports.removeFields = removeFields;
exports.loadPlanning = loadPlanning;
exports.newField = newField;
exports.removeInput = removeInput;
exports.addInput = addInput;
exports.fieldChanged = fieldChanged;
exports.strikeField = strikeField;

var _settings_en = require('../../assets/settings_en.json');

var _settings_en2 = _interopRequireDefault(_settings_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by benjaminafonso on 26/06/2017.
                                                                                                                                                                                                     */

function usePreset(dispatch, preset) {
  var settings = _settings_en2.default;

  if (settings[preset]) {
    dispatch(setWritingType(settings[preset].title, settings[preset].icon, settings[preset].needsTitle));
    settings[preset].fields.map(function (field) {
      return dispatch(newField(field.title, field.type, field.numberOfFields, field.numberPerRow, field.overloadable, field.removeable, [].concat(_toConsumableArray(Array(field.numberOfFields))).map(function (field, index) {
        return { index: index, value: '' };
      })));
    });
  }
}

/**
 * Preset:
 * - title: string (Plan your ${title})
 * - icon: base64 icon
 * - needsTitle: boolean
 * - fields
 *   - title: string (The question above the inputs)
 *   - type: ['input','textarea'] (The type of fields to render)
 *   - numberOfFields: number
 *   - numberPerRow: number
 *   - overloadable: boolean
 *   - removeable: boolean
 *   - fields: string[] (The values of the inputs :: fields.length === numberOfFields)
 *
 *
 * @param dispatch
 * @param preset
 */
function useCustomPreset(dispatch, preset) {
  dispatch(setWritingType(preset.title, preset.icon, preset.needsTitle));
  preset.fields.map(function (field) {
    return dispatch(newField(field.title, field.type, field.numberOfFields, field.numberPerRow, field.overloadable, field.removeable, field.fields.map(function (field, index) {
      return { index: index, value: field };
    })));
  });
}

function setWritingType(title) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var needsTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return {
    type: 'SET_WRITING_TYPE',
    payload: {
      title: title,
      icon: icon,
      needsTitle: needsTitle
    }
  };
}

function setInformations(image, description) {
  return {
    type: 'SET_INFORMATIONS',
    payload: {
      image: image,
      description: description
    }
  };
}

function savePlanningLocalStorage() {
  return {
    type: 'SAVE_PLANNING_LOCALSTORAGE'
  };
}

function loadPlanningLocalstorage(dispatch) {
  var planning = window.localStorage.getItem('nzk-planning');
  if (planning) {
    loadPlanning(dispatch, JSON.parse(planning));
  }
}

function removeFields() {
  return {
    type: 'REMOVE_FIELDS'
  };
}

function loadPlanning(dispatch, planning) {
  dispatch(removeFields());
  dispatch(setWritingType(planning.title, planning.icon));
  planning.fields.map(function (field, i) {
    return dispatch(newField(field.title, field.type, field.numberOfFields, field.numberPerRow, field.overloadable, field.removeable, planning.fields[i].fields));
  });
}

function newField(title, type, nbFields, nbFieldsPerRow, overloadable, removeable, fields) {
  return {
    type: 'NEW_FIELD',
    payload: {
      key: title,
      title: title,
      type: type,
      nbFields: nbFields,
      nbFieldsPerRow: nbFieldsPerRow,
      overloadable: overloadable,
      removeable: removeable,
      fields: fields
    }
  };
}

function removeInput(fieldIndex, index) {
  return {
    type: 'REMOVE_INPUT_FIELD',
    payload: {
      fieldIndex: fieldIndex,
      index: index
    }
  };
}

function addInput(fieldIndex) {
  return {
    type: 'ADD_INPUT_FIELD',
    payload: {
      fieldIndex: fieldIndex
    }
  };
}

function fieldChanged(fieldIndex, inputIndex, newValue) {
  return {
    type: 'FIELD_CHANGED',
    payload: {
      fieldIndex: fieldIndex,
      inputIndex: inputIndex,
      newValue: newValue
    }
  };
}

function strikeField(fieldIndex, inputIndex, striked) {
  return {
    type: 'STRIKE_FIELD',
    payload: {
      fieldIndex: fieldIndex,
      inputIndex: inputIndex,
      striked: striked
    }
  };
}