import { createAction, handleActions } from 'redux-actions';

enum ActionType {
  SET_BONUS_TIME = 'SET_BONUS_TIME_ACTION',
  SET_MAP_SIZE = 'SET_MAP_SIZE_ACTION',
  SET_DURATION_TIME = 'SET_DURATION_TIME_ACTION',
  SAVE_SETTINGS = 'SAVE_SETTINGS_ACTION',
  FETCH_SETTINGS = 'FETCH_SETTINGS_ACTION',
  SETTINGS_FETCHED = 'SETTINGS_FETCHED_ACTION',
}

const setBonusTime = createAction(ActionType.SET_BONUS_TIME);
const setMapSize = createAction(ActionType.SET_MAP_SIZE);
const setDurationTime = createAction(ActionType.SET_DURATION_TIME);

const saveSettings = createAction(ActionType.SAVE_SETTINGS);
const fetchSettings = createAction(ActionType.FETCH_SETTINGS);
const settingsFetched = createAction(ActionType.SETTINGS_FETCHED);

const reducer = handleActions<ISettings>(
  {
    [ActionType.SET_BONUS_TIME]: (state, action) => ({
      ...state,
      bonusTime: action.payload.bonusTime,
    }),
    [ActionType.SET_MAP_SIZE]: (state, action) => ({
      ...state,
      mapSize: action.payload.mapSize,
    }),
    [ActionType.SET_DURATION_TIME]: (state, action) => ({
      ...state,
      durationTime: action.payload.durationTime,
    }),
    [ActionType.SETTINGS_FETCHED]: (state, action) => ({
      ...action.payload,
    }),
  },
  {
    bonusTime: 3,
    mapSize: 4,
    durationTime: 1,
  },
);

export interface ISettings {
  bonusTime: number;
  mapSize: number;
  durationTime: number;
}

export default reducer;
export {
  ActionType,
  setBonusTime,
  setMapSize,
  setDurationTime,
  saveSettings,
  fetchSettings,
  settingsFetched,
};
