/*
* This global reducer is called every time a state change is
* made in the application using `.dispatch`. The state changes implemented here
* are very simple. As they get more complicated and numerous,
* these are conventionally broken out into separate "actions" files
* that would live at client/app/actions/**.js.
*/
import update from 'immutability-helper';
import * as Constants from '../constants/constants';

export const mapDataToInitialState = function(state = {}) {
  return state;
};

export const newDocketState = (action, state) => {
  const [, date, index,, property] = action.payload.prop.split('.');

  return update(state, {
    dockets: {
      [date]: {
        hearings_hash: {
          [index]: {
            [property]: { $set: action.payload.value }
          }
        }
      }
    }
  });
};

export const hearingsReducers = function(state = mapDataToInitialState(), action = {}) {
  switch (action.type) {
  case 'POPULATE_DOCKETS':
    return update(state, {
      dockets: { $set: action.payload.dockets }
    });

  case Constants.SET_TRANSCRIPT_REQUESTED:
    return update(state, {
      dockets: {
        [action.payload.date]: {
          hearings_hash: {
            [action.payload.hearingIndex]: {
              transcript_requested: {$set: action.payload.value}
            }
          }
        }
      }
    })

  case 'UPDATE_DAILY_DOCKET_NOTES':
  case 'UPDATE_DAILY_DOCKET_TRANSCRIPT':
  case 'UPDATE_DAILY_DOCKET_ACTION':
    return newDocketState(action, state);

  case 'POPULATE_WORKSHEET':
    return update(state, {
      worksheet: { $set: action.payload.worksheet }
    });

  case 'TOGGLE_SAVING':
    return update(state, {
      saving: { $set: !state.saving }
    });

  case 'HANDLE_SERVER_ERROR':
    return update(state, {
      serverError: { $set: action.payload.err }
    });

  default: return state;
  }
};
export default hearingsReducers;
