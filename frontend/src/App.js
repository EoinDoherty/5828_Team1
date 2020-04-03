import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiData, setApiData] = useState("Unable to connect to backend");

  useEffect(() => {
    fetch("/api/heartbeat").then(response => {
      console.log(response);
      return response.json();
    }).then(data => {
        console.log(data);
        setApiData(data.text);
      })
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {apiData}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
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
