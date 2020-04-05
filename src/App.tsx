import React from 'react'
import Auth from './components/Auth'
import Home from './routes/Home'
import Navbar from './components/Navbar'
import 'antd/dist/antd.css'
// import './App.css';

function App() {
  return (
    <div className="App">
      <Auth>
        <Navbar />
        <Home />
      </Auth>
    </div>
  )
}

export default App
