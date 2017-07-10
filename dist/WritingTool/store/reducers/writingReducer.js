'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by benjaminafonso on 23/06/2017.
                                                                                                                                                                                                                                                                   */

exports.default = reducer;

var _slate = require('slate');

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    title: window.localStorage.getItem('nzk-writing') ? JSON.parse(window.localStorage.getItem('nzk-writing')).title : '',
    state: window.localStorage.getItem('nzk-writing') ? JSON.parse(window.localStorage.getItem('nzk-writing')).state : {
      nodes: [{
        kind: 'block',
        type: 'paragraph',
        nodes: []
      }]
    },
    lastSave: 0,
    constraints: {
      minNbWords: 30,
      maxNbWords: undefined
    },
    save: {
      save_succeeded: false,
      save_failed: false,
      save_error: undefined,
      last_save: undefined
    },
    nbWords: 0,
    progress: 0
  };
  var action = arguments[1];

  switch (action.type) {
    case 'TEXT_CHANGED':
      {
        return _extends({}, state, {
          state: action.payload.newState,
          lastSave: state.lastSave + 1
        });
      }
    case 'SAVE_LOCALSTORAGE':
      {
        var content = state.state;
        window.localStorage.setItem('nzk-writing', JSON.stringify(_extends({}, state, {
          state: _slate.Raw.serialize(content)
        })));
        return _extends({}, state, {
          lastSave: 0
        });
      }
    case 'UPDATE_NB_WORDS':
      {
        return _extends({}, state, {
          nbWords: action.payload
        });
      }
    case 'UPDATE_PROGRESS':
      {
        return _extends({}, state, {
          progress: action.payload
        });
      }
    case 'SET_MIN_NB_WORDS':
      {
        return _extends({}, state, {
          constraints: _extends({}, state.constraints, {
            minNbWords: action.payload
          })
        });
      }
    case 'SET_MAX_NB_WORDS':
      {
        return _extends({}, state, {
          constraints: _extends({}, state.constraints, {
            maxNbWords: action.payload
          })
        });
      }
    case 'SET_TITLE':
      {
        return _extends({}, state, {
          title: action.payload
        });
      }
    case 'LOAD_WRITING_LOCALSTORAGE':
      {
        var newState = JSON.parse(window.localStorage.getItem('nzk-writing'));
        if (newState) {
          return newState;
        } else {
          return state;
        }
      }
    default:
      return state;
  }
}