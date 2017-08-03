'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by benjaminafonso on 23/06/2017.
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    title: '',
    needsTitle: true,
    icon: '',
    informations: {
      image: '',
      description: ''
    },
    fields: [],
    lastSave: 0
  };
  var action = arguments[1];

  var newFields;
  switch (action.type) {
    case 'SET_WRITING_TYPE':
      {
        return _extends({}, state, {
          title: action.payload.title,
          icon: action.payload.icon,
          needsTitle: action.payload.needsTitle
        });
      }
    case 'SET_INFORMATIONS':
      {
        return _extends({}, state, {
          informations: {
            image: action.payload.image,
            description: action.payload.description
          }

        });
      }
    case 'REMOVE_FIELDS':
      {
        return _extends({}, state, {
          fields: []
        });
      }
    case 'NEW_FIELD':
      {
        return _extends({}, state, {
          fields: [].concat(_toConsumableArray(state.fields || []), [{
            title: action.payload.title,
            type: action.payload.type,
            nbFields: action.payload.nbFields,
            nbFieldsPerRow: action.payload.nbFieldsPerRow,
            overloadable: action.payload.overloadable,
            removeable: action.payload.removeable,
            fields: action.payload.fields
          }])
        });
      }
    case 'REMOVE_INPUT_FIELD':
      {
        newFields = state.fields.slice();
        newFields[action.payload.fieldIndex].fields.splice(action.payload.index, 1);
        newFields[action.payload.fieldIndex].fields = newFields[action.payload.fieldIndex].fields.map(function (field, index) {
          field.index = index;
          return field;
        });
        return _extends({}, state, {
          fields: newFields
        });
      }
    case 'ADD_INPUT_FIELD':
      {
        newFields = state.fields.slice();
        newFields[action.payload.fieldIndex].fields.push({
          value: '',
          index: newFields.length
        });
        return _extends({}, state, {
          fields: newFields
        });
      }
    case 'FIELD_CHANGED':
      {
        newFields = state.fields.slice();
        newFields[action.payload.fieldIndex].fields[action.payload.inputIndex].value = action.payload.newValue;
        return _extends({}, state, {
          fields: newFields,
          lastSave: state.lastSave + 1
        });
      }
    case 'STRIKE_FIELD':
      {
        newFields = state.fields.slice();
        newFields[action.payload.fieldIndex].fields[action.payload.inputIndex].striked = action.payload.striked;
        return _extends({}, state, {
          fields: newFields
        });
      }
    case 'SAVE_PLANNING_LOCALSTORAGE':
      {
        window.localStorage.setItem('nzk-planning', JSON.stringify(state));
        return _extends({}, state, {
          lastSave: 0
        });
      }
    case 'LOAD_PLANNING_LOCALSTORAGE':
      {
        var newState = JSON.parse(window.localStorage.getItem('nzk-planning'));
        console.log(newState);
        return {
          newState: newState
        };
      }
    case 'REMOVE_PLANNING_LOCALSTORAGE':
      {
        window.localStorage.removeItem('nzk-planning');
        return _extends({}, state, {
          lastSave: 0
        });
      }
    case 'CLEAR_PLANNING':
      {
        newFields = state.fields.slice();
        newFields.map(function (field, i) {
          field.fields.map(function (input) {
            return input.value = '';
          });
        });
        return _extends({}, state, {
          fields: newFields
        });
      }
    default:
      return state;
  }
}