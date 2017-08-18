'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PLACEHOLDERS':
      {
        return _extends({}, state, {
          placeholders: _extends({}, state.placeholders, action.payload)
        });
      }
    case 'SET_WRITING':
      {
        return _extends({}, state, {
          writing: _extends({}, state.writing, action.payload)
        });
      }
    case 'SET_CONSTRAINTS':
      {
        return _extends({}, state, {
          constraints: _extends({}, state.constraints, action.payload)
        });
      }
    case 'SET_PROMPT':
      {
        return _extends({}, state, {
          prompt: _extends({}, state.prompt, action.payload)
        });
      }
    case 'ADD_SECTION':
      {
        return _extends({}, state, {
          sections: [].concat(_toConsumableArray(state.sections || []), [action.payload])
        });
      }
    case 'SET_WORD_COUNT':
      {
        return _extends({}, state, {
          wordCount: action.payload
        });
      }
    case 'REMOVE_FIELD':
      {
        var sections = state.sections.slice();

        sections[action.payload.sectionIndex].fields.splice(action.payload.fieldIndex, 1);

        /* eslint-disable */
        sections[action.payload.sectionIndex].fields = sections[action.payload.sectionIndex].fields.map(function (field, index) {
          field.index = index;
          return field;
        });
        /* eslint-enable */

        return _extends({}, state, {
          sections: sections
        });
      }
    case 'ADD_FIELD':
      {
        var _sections = state.sections.slice();
        var section = _sections[action.payload.sectionIndex];

        section.fields.push({
          value: '',
          index: section.fields.length,
          removable: section.fieldsAreRemovable
        });

        section.fields = section.fields.slice();

        return _extends({}, state, {
          sections: _sections
        });
      }
    case 'SET_FIELD_VALUE':
      {
        var _sections2 = state.sections.slice();

        /* eslint-disable */
        _sections2[action.payload.sectionIndex].fields[action.payload.fieldIndex].value = action.payload.value;
        /* eslint-enable */

        return _extends({}, state, {
          sections: _sections2
        });
      }
    case 'CLEAR':
      {
        var _sections3 = state.sections.slice();
        _sections3.map(function (section, i) {
          section.fields.map(function (input) {
            input.value = '';
          });
        });
        return _extends({}, state, {
          writing: {
            title: '',
            text: ''
          },
          sections: _sections3
        });
      }
    default:
      return state;
  }
}