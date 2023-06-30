import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './settings.component.scss';
import {
  fetchSettings, saveSettings, setBonusTime, setDurationTime, setMapSize,
} from '../../reducers/settings.reducer';
import { IGameStore } from '../../store.interface';
import WrappedInput from '../wrapped-input/wrapped-input.component';
import WrappedSelect, { SizeOptionItem } from '../wrapped-select/wrapped-select.component';

const getSizeLabel = (size: number) => `${size}x${size}`;
const availableSizes = [3, 4, 5, 6, 7, 8, 9];
const sizeOptions: SizeOptionItem[] = availableSizes.map((size) => ({
  key: size,
  value: size.toString(),
  label: getSizeLabel(size),
}));

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

      <WrappedInput
        label="Time to see all pictures at start (sec):"
        name="bonusTime"
        type="number"
        value={settingsData.bonusTime}
        onChange={(bonusTime) => dispatch(setBonusTime(bonusTime))}
      />

      <WrappedSelect
        label="Size of the map:"
        value={settingsData.mapSize.toString()}
        name="sizeOfMap"
        options={sizeOptions}
        onChange={(mapSize) => dispatch(setMapSize(+mapSize))}
      />

      <WrappedInput
        label="Duration of the game (min):"
        name="durationTime"
        type="number"
        value={settingsData.durationTime}
        onChange={(durationTime: number) => dispatch(setDurationTime(durationTime))}
      />

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
