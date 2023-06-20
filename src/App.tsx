import React, { useState } from 'react';

import './App.scss';
import Settings from './components/settings/settings.component';
import { ISettings } from './reducers/settings.reducer';
import Board from './components/board/board.component';

function App() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(true);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isBoardVisible, setIsBoardVisible] = useState(false);
  const [currentGameSettings, setCurrentGameSettings] = useState<ISettings | null>(null);

  const onStartGame = (settings: ISettings) => {
    setCurrentGameSettings(settings);
    setIsSettingsVisible(false);
    setIsBoardVisible(true);
    setIsGamePaused(false);
  };

  const onPauseGame = () => {
    setIsGamePaused(true);
    setIsSettingsVisible(true);
  };

  const onResumeGame = () => {
    setIsSettingsVisible(false);
    setIsGamePaused(false);
  };

  return (
    <div className="ftpr-app">
      { isBoardVisible && currentGameSettings
        && (
          <Board
            onPauseGame={onPauseGame}
            settings={currentGameSettings}
            isPaused={isGamePaused}
          />
        )}
      { isSettingsVisible
        && (
          <Settings
            isGamePaused={isGamePaused}
            onStartGame={onStartGame}
            onResumeGame={onResumeGame}
          />
        )}
    </div>
  );
}

export default App;
