import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import webFont from "webfontloader"
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';


const App = () => {

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"]
      }
    })
  }, [])
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;