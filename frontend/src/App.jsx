import React, { useEffect, useState } from 'react'
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
import Shipping from './Pages/Shipping/Shipping';
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder';
import axios from 'axios';
import Payment from './Pages/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from './Pages/Success/Success';
import MyOrder from './Pages/Order/MyOrder';
import SingleOrderDetail from './Pages/SingleOrderDetails/SingleOrderDetail';
import DashBoard from './Admin/DashBoard/DashBoard';
import ProductList from './Admin/ProductList/ProductList';
import AddProduct from './Admin/AddProduct/AddProduct';
import ProductUpdate from './Admin/Update/ProductUpdate';
import OrderList from './Admin/OrderList/OrderList';
import ProcessOrder from './Admin/ProcessOrder/ProcessOrder';
import UserList from './Admin/UserList/UserList';
import UpdateUser from './Admin/UpdateUser/UpdateUser';
import ProductReviews from './Admin/ProductReviewManage/ProductReviews';
import AboutUs from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import NotFound from './Pages/NotFound/NotFound';




const App = () => {

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const response = await axios.get('/api/v1/payment/stripeapikey');
    console.log(response.data);
    setStripeApiKey(response.data.stripeApiKey)
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser()); // another technique call aur dispatch the function in action
    getStripeApiKey();
  }, [])
  // console.log(stripeApiKey);
  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {stripeApiKey && (
              <Route
                path='/process/payment'
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route path='/products/:keyword' element={<AllProduct />} />
          <Route path='/products' element={<AllProduct />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/account' element={<Profile />} />
            <Route path='/me/update' element={<UpdateProfile />} />
            <Route path='/me/password' element={<UpdatePassword />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/order/confirm' element={<ConfirmOrder />} />
            
            <Route path='/success' element={<Success />} />
            <Route path='/orders' element={<MyOrder />} />
            <Route path='/order/:id' element={<SingleOrderDetail />} />
            <Route isAdmin={true} path='/admin/dashboard' element={<DashBoard />} />
            <Route isAdmin={true} path='/admin/products' element={<ProductList />} />
            <Route isAdmin={true} path='/admin/product' element={<AddProduct />} />
            <Route isAdmin={true} path='/admin/product/:id' element={<ProductUpdate />} />
            <Route isAdmin={true} path='/admin/orders' element={<OrderList />} />
            <Route isAdmin={true} path='/admin/order/:id' element={<ProcessOrder />} />
            <Route isAdmin={true} path='/admin/users' element={<UserList />} />
            <Route isAdmin={true} path='/admin/user/:id' element={<UpdateUser />} />
            <Route isAdmin={true} path='/admin/reviews' element={<ProductReviews />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;