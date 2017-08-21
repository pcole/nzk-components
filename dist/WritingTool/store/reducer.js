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
          placeholders: _extends({}, action.payload)
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
    case 'MERGE_SECTION':
      {
        var sections = [].concat(_toConsumableArray(state.sections));
        var hasMerged = false;

        for (var i = 0, lenS = sections.length; i < lenS; i++) {
          var section = sections[i];

          if (section.title === action.payload.title && section.fieldType === action.payload.fieldType) {
            for (var y = 0, lenF = section.fields.length; y < lenF; y++) {
              var field = section.fields[y];
              var payloadField = action.payload.fields[y];

              if (payloadField) {
                if (field.value !== payloadField.value) {
                  field.value = field.value || payloadField.value;
                }
              }
            }
            hasMerged = true;
          }
        }

        if (!hasMerged) {
          sections.push(action.payload);
        }

        return _extends({}, state, {
          sections: sections
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
        var _sections = state.sections.slice();

        _sections[action.payload.sectionIndex].fields.splice(action.payload.fieldIndex, 1);

        /* eslint-disable */
        _sections[action.payload.sectionIndex].fields = _sections[action.payload.sectionIndex].fields.map(function (field, index) {
          field.index = index;
          return field;
        });
        /* eslint-enable */

        return _extends({}, state, {
          sections: _sections
        });
      }
    case 'ADD_FIELD':
      {
        var _sections2 = state.sections.slice();
        var _section = _sections2[action.payload.sectionIndex];

        _section.fields.push({
          value: ''
        });

        _section.fields = _section.fields.slice();

        return _extends({}, state, {
          sections: _sections2
        });
      }
    case 'SET_FIELD_VALUE':
      {
        var _sections3 = state.sections.slice();

        /* eslint-disable */
        _sections3[action.payload.sectionIndex].fields[action.payload.fieldIndex].value = action.payload.value;
        /* eslint-enable */

        return _extends({}, state, {
          sections: _sections3
        });
      }
    case 'CLEAR':
      {
        var _sections4 = state.sections.slice();
        _sections4.map(function (section, i) {
          section.fields.map(function (input) {
            input.value = '';
          });
        });
        return _extends({}, state, {
          writing: {
            title: '',
            text: ''
          },
          sections: _sections4
        });
      }
    default:
      return state;
  }
}