import * as Constants from '../constants/constants';

export const populateDockets = (dockets) => ({
  type: Constants.POPULATE_DOCKETS,
  payload: {
    dockets
  }
});

export const populateWorksheet = (worksheet) => ({
  type: Constants.POPULATE_WORKSHEET,
  payload: {
    worksheet
  }
});

export const handleServerError = (err) => ({
  type: Constants.HANDLE_SERVER_ERROR,
  payload: {
    err
  }
});

/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
export let lastChangeTimestamp = null;

export const updatedHearing = (action, milliseconds = 1000) =>
  (dispatch, getState) => {

    dispatch(action);

    lastChangeTimestamp = Number(new Date());

    // create a function that, after a moment (default 1000ms),
    // checks if no subsequent actions have been called updatedHearing().
    // If true (meaning the time at which the function runs matches
    // the time at which it was created), save the new data.

    eval(`
      setTimeout(() => {
        if (${lastChangeTimestamp} === lastChangeTimestamp) {
          dispatch({type:'TOGGLE_SAVING'});
          saveData(getState().dockets, dispatch);
        }
      }, ${milliseconds});`
    );
    // filter out edited:true + pass that to saveData()?

  };
/* eslint-enable no-unused-vars */
/* eslint-enable no-eval */

/* eslint-disable no-unused-vars */
export const saveData = (data, dispatch, url = '/hearings/save_data') => {
  // ApiUtil.put(url, { data }).
  //   then(
  //     () => dispatch({
  //       type: 'TOGGLE_SAVING'
  //     }),
  //     (err) => {
  //       dispatch(handleServerError(err));
  //     }
  //   );
  // For now, assume the PUT request gets a successful response in 1 second
  setTimeout(() => {
    dispatch({
      type: 'TOGGLE_SAVING'
    });
  }, 1000);
};
/* eslint-enable no-unused-vars */


export const setNotes = (hearingIndex, notes, date) => {
  return updatedHearing({
    type: Constants.SET_NOTES,
    payload: {
      hearingIndex,
      notes,
      date
    }
  });
};

export const setDisposition = (hearingIndex, disposition, date) => {
  return updatedHearing({
    type: Constants.SET_DISPOSITION,
    payload: {
      hearingIndex,
      disposition,
      date
    }
  });
};

export const setHoldOpen = (hearingIndex, holdOpen, date) => {
  return updatedHearing({
    type: Constants.SET_HOLD_OPEN,
    payload: {
      hearingIndex,
      holdOpen,
      date
    }
  });
};

export const setAod = (hearingIndex, aod, date) => {
  return updatedHearing({
    type: Constants.SET_AOD,
    payload: {
      hearingIndex,
      aod,
      date
    }
  });
};

export const setAddOn = (hearingIndex, addOn, date) => {
  return updatedHearing({
    type: Constants.SET_ADD_ON,
    payload: {
      hearingIndex,
      addOn,
      date
    }
  });
};

export const setTranscriptRequested = (hearingIndex, transcriptRequested, date) => {
  return updatedHearing({
    type: Constants.SET_TRANSCRIPT_REQUESTED,
    payload: {
      hearingIndex,
      transcriptRequested,
      date
    }
  });
};

/* eslint-disable no-unused-vars */
export const saveHearingsBeforeWindowCloses = () => (dispatch, getState) => {
  const dockets = getState().dockets;
  // filter out edited:true + send only those to server?
  // maybe not here...could take too long.  idk...

  // The PUT request doesn't matter right now
  // ApiUtil.put(
  //     '/hearings/save_data', { data: dockets }
  //   ).then(
  //     // w/o then(), PUT request seems to fail
  //   );
};
/* eslint-enable no-unused-vars */

export const onContentionsChange = (contentions) => ({
  type: Constants.SET_CONTENTIONS,
  payload: {
    contentions
  }
});

export const onPeriodsChange = (periods) => ({
  type: Constants.SET_PERIODS,
  payload: {
    periods
  }
});

export const onEvidenceChange = (evidence) => ({
  type: Constants.SET_EVIDENCE,
  payload: {
    evidence
  }
});

export const onCommentsChange = (comments) => ({
  type: Constants.SET_COMMENTS,
  payload: {
    comments
  }
});
