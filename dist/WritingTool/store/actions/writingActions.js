'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textChanged = textChanged;
exports.saveWritingLocalstorage = saveWritingLocalstorage;
exports.loadWritingLocalstorage = loadWritingLocalstorage;
exports.updateNbWords = updateNbWords;
exports.updateProgress = updateProgress;
/**
 * Created by benjaminafonso on 26/06/2017.
 */

function textChanged(newState) {
  return {
    type: 'TEXT_CHANGED',
    payload: {
      newState: newState
    }
  };
}

function saveWritingLocalstorage() {
  return {
    type: 'SAVE_LOCALSTORAGE'
  };
}

function loadWritingLocalstorage() {
  return {
    type: 'LOAD_WRITING_LOCALSTORAGE'
  };
}

function updateNbWords(number) {
  return {
    type: 'UPDATE_NB_WORDS',
    payload: number
  };
}

function updateProgress(progress) {
  return {
    type: 'UPDATE_PROGRESS',
    payload: progress
  };
}