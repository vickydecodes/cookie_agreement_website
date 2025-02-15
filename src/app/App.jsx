import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes'

function App() {

  return (
    <>
    <Router>
    <AppRoutes/>   
    </Router>
 </>
  )
}

export default App
