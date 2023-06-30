import { Action, combineActions, createAction } from 'redux-actions';
import { handleActions } from '../utils/redux-actions';

enum ActionType {
  SET_BONUS_TIME = 'SET_BONUS_TIME',
  SET_MAP_SIZE = 'SET_MAP_SIZE',
  SET_DURATION_TIME = 'SET_DURATION_TIME',

  // Saga's actions
  SAVE_SETTINGS = 'SAVE_SETTINGS',
  FETCH_SETTINGS = 'FETCH_SETTINGS',
  SETTINGS_FETCHED = 'SETTINGS_FETCHED',
}

export const setBonusTime = createAction(ActionType.SET_BONUS_TIME, (bonusTime: number) => ({ bonusTime }));
export const setMapSize = createAction(ActionType.SET_MAP_SIZE, (mapSize: number) => ({ mapSize }));
export const setDurationTime = createAction(ActionType.SET_DURATION_TIME, (durationTime: number) => ({ durationTime }));
export const settingsFetched = createAction<ISettings>(ActionType.SETTINGS_FETCHED);

// Saga's actions
export const saveSettings = createAction<void>(ActionType.SAVE_SETTINGS);
export const fetchSettings = createAction<void>(ActionType.FETCH_SETTINGS);

const handlers = [
  [
    combineActions(
      setBonusTime,
      setMapSize,
      setDurationTime,
      settingsFetched,
    ),
    (state: ISettings, { payload }: Action<Partial<ISettings>>) => ({
      ...state,
      ...payload,
    }),
  ],
];

export const settingsReducer = handleActions<ISettings>(
  handlers,
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
