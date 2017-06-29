'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textChanged = textChanged;
exports.saveLocalstorage = saveLocalstorage;
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

function saveLocalstorage() {
  return {
    type: 'SAVE_LOCALSTORAGE'
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