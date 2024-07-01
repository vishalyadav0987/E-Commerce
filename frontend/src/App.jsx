import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import webFont from "webfontloader"
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import SingleProductPage from './Pages/SingleProductPage/SingleProductPage';
import AllProduct from './Pages/AllProducts/AllProduct';
import Search from './Pages/Search/Search';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import Profile from './Pages/Profile/Profile';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Utils/ProtectedRoute';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';
import UpdatePassword from './Pages/UpdatePassword/UpdatePassword';
import Cart from './Pages/Cart/Cart';




const App = () => {

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser()); // another technique call aur dispatch the function in action
  }, [])
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route path='/products/:keyword' element={<AllProduct />} />
          <Route path='/products' element={<AllProduct />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/account' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/me/update' element={<UpdateProfile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/me/password' element={<UpdatePassword />} />
          </Route>
          <Route path='/cart' Component={Cart} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;