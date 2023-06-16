import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from './logo.svg';
import './App.scss';
import rotateReducer from './reducers/counter-reducer';
import increaseAction from './actions/increase-action';
import decreaseAction from './actions/decrease-action';
import increaseActionAsync from './actions/increase-action-async';

function App() {
  const rotating = useSelector(rotateReducer);
  const dispatch = useDispatch();

  return (
    <div className="ftpr-app">
      <header className="ftpr-app-header">
        <img src={logo} className="ftpr-app-logo" alt="logo" />
        <p>
          { JSON.stringify(rotating) }
        </p>

        <button type="button" className="ftpr-app-btn" onClick={() => { dispatch(increaseAction); }}>
          click Me + 1
        </button>
        <button type="button" className="ftpr-app-btn" onClick={() => { dispatch(decreaseAction); }}>
          click Me - 1
        </button>
        <button type="button" className="ftpr-app-btn" onClick={() => { dispatch(increaseActionAsync); }}>
          click Me + 1 Async
        </button>
      </header>
    </div>
  );
}

export default App;
