import React from 'react'
import Home from './routes/Home'
import Navbar from './components/Navbar'
import 'antd/dist/antd.css'
// import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  )
}

export default App
