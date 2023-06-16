import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from './logo.svg';
import './App.scss';
import counterReducer, {
  IStore, decrease, increase, increaseAsync, read,
} from './reducers/counter-reducer';

function App() {
  const rotating = useSelector(
    (state: IStore) => counterReducer(state, read()),
  );
  const dispatch = useDispatch();

  return (
    <div className="ftpr-app">
      <header className="ftpr-app-header">
        <img src={logo} className="ftpr-app-logo" alt="logo" />
        <p>
          { JSON.stringify(rotating) }
        </p>

        <button type="button" className="ftpr-app-btn" onClick={() => { dispatch(increase()); }}>
          click Me + 1
        </button>
        <button type="button" className="ftpr-app-btn" onClick={() => { dispatch(decrease()); }}>
          click Me - 1
        </button>
        <button type="button" className="ftpr-app-btn" onClick={() => { dispatch(increaseAsync()); }}>
          click Me + 1 Async
        </button>
      </header>
    </div>
  );
}

export default App;
