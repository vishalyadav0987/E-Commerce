import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import webFont from "webfontloader"
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import SingleProductPage from './Pages/SingleProductPage/SingleProductPage';
import Review from './Components/Review/Review';


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
          <Route path='/product/:id' element={<SingleProductPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;