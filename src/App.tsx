import React from 'react';
import Home from './routes/Home'
import 'antd/dist/antd.css';
// import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
