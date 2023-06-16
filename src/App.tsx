import React from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="ftpr-app">
      <header className="ftpr-app-header">
        <img src={logo} className="ftpr-app-logo" alt="logo" />
        <p>
          {/* eslint-disable react/jsx-one-expression-per-line */}
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="ftpr-app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
