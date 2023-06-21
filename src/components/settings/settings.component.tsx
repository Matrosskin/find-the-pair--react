import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './settings.component.scss';
import {
  fetchSettings, saveSettings, setBonusTime, setDurationTime, setMapSize,
} from '../../reducers/settings.reducer';
import { IGameStore } from '../../store';

const availableSizes = [3, 4, 5, 6, 7, 8, 9];
const getSizeLabel = (size: number) => `${size}x${size}`;

type SettingsProps = {
  isGamePaused: boolean,
  onStartGame: () => void,
  onResumeGame: () => void,
};

function Settings({ isGamePaused, onStartGame, onResumeGame }: SettingsProps) {
  const settingsData = useSelector((store: IGameStore) => store.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
  }, []);

  const onStartClick = () => {
    dispatch(saveSettings());
    onStartGame();
  };

  const onResumeClick = () => {
    onResumeGame();
  };

  return (
    <div className="settings-form card">
      <h1>Settings</h1>

      <div className="form-line">
        {/* TODO: Need to find e reason why this rule triggers an error even if I used 'htmlFor' */}
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="bonusTime">
          Time to see all pictures at start (sec):
        </label>
        <input
          type="number"
          name="bonusTime"
          id="bonusTime"
          className="game-input"
          value={settingsData.bonusTime}
          onChange={(event) => dispatch(setBonusTime({ bonusTime: event.target.valueAsNumber }))}
        />
      </div>

      <div className="form-line">
        {/* TODO: Need to find e reason why this rule triggers an error even if I used 'htmlFor' */}
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="sizeOfMap">
          Size of the map:
        </label>
        <select
          name="sizeOfMap"
          id="sizeOfMap"
          className="game-select"
          value={settingsData.mapSize}
          onChange={(event) => dispatch(setMapSize({ mapSize: +event.target.value }))}
        >
          { availableSizes.map((size) => (
            <option value={size} key={size}>{ getSizeLabel(size) }</option>
          )) }
        </select>
      </div>

      <div className="form-line">
        {/* TODO: Need to find e reason why this rule triggers an error even if I used 'htmlFor' */}
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="gameDuration">
          Duration of the game (min):
        </label>
        <input
          type="number"
          name="gameDuration"
          id="gameDuration"
          className="game-input"
          value={settingsData.durationTime}
          onChange={(event) => dispatch(setDurationTime({ durationTime: event.target.valueAsNumber }))}
        />
      </div>

      <div className="form-line divider" />

      <div className="form-line">
        <button type="button" className="game-btn green-btn" onClick={onStartClick}>Start</button>
      </div>

      {
        isGamePaused
        && (
          <div className="form-line">
            <button type="button" className="game-btn blue-btn" onClick={onResumeClick}>Resume</button>
          </div>
        )
      }
    </div>
  );
}

export default Settings;
