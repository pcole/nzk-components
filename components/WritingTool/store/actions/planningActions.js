/**
 * Created by benjaminafonso on 26/06/2017.
 */

import settings from '../../components/PlanningDrawer/settings.json'

export function usePreset (dispatch, preset) {
  if (settings[preset]) {
    settings[preset].fields.map((field) => {
      dispatch(newField(field.title, field.numberOfFields, field.numberPerRow, field.overloadable, field.removeable))
    })
  }
}

export function newField (title, nbFields, nbFieldsPerRow, overloadable, removeable) {
  return {
    type: 'NEW_FIELD',
    payload: {
      title: title,
      nbFields: nbFields,
      nbFieldsPerRow: nbFieldsPerRow,
      overloadable: overloadable,
      removeable: removeable
    }
  }
}

export function fieldChanged (field, newValue) {
  return {
    type: 'FIELD_CHANGED',
    payload: {
      field: field,
      newValue: newValue
    }
  }
}
