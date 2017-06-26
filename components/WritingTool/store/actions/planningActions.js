/**
 * Created by benjaminafonso on 26/06/2017.
 */

import settings from '../../components/PlanningDrawer/settings.json'

export function usePreset (dispatch, preset) {
  if (settings[preset]) {
    dispatch(setTitle(settings[preset].title, settings[preset].icon))
    settings[preset].fields.map((field) => {
      dispatch(newField(field.title, field.type, field.numberOfFields, field.numberPerRow, field.overloadable, field.removeable))
    })
  }
}

export function setTitle(title, icon = '') {
  return {
    type: 'SET_TITLE',
    payload: {
      title: title,
      icon: icon
    }
  }
}
export function newField (title, type, nbFields, nbFieldsPerRow, overloadable, removeable) {
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
      fields: [...Array(nbFields)].map((field,index) => {return {index: index, value: ''}})
    }
  }
}

export function removeInput(fieldIndex, index) {
  return {
    type: 'REMOVE_INPUT_FIELD',
    payload: {
      fieldIndex: fieldIndex,
      index: index
    }
  }
}

export function addInput(fieldIndex) {
  return {
    type: 'ADD_INPUT_FIELD',
    payload: {
      fieldIndex: fieldIndex
    }
  }
}

export function fieldChanged (fieldIndex, inputIndex, newValue) {
  console.log(inputIndex)
  return {
    type: 'FIELD_CHANGED',
    payload: {
      fieldIndex: fieldIndex,
      inputIndex: inputIndex,
      newValue: newValue
    }
  }
}
