import React from 'react';

import './App.scss';
import Settings from './components/settings.component';

function App() {
  return (
    <div className="ftpr-app">
      <Settings
        isGamePaused={false}
        onStartGame={() => { console.error('Start btn click handler is not yet implemented'); }}
        onResumeGame={() => { console.error('Resume btn click handler is not yet implemented'); }}
      />
    </div>
  );
}

export default App;
