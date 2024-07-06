import React, { useState } from 'react'
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import './Shipping.css'
import { FaHome, FaPhone } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import CheckOutStep from '../../Components/CheckOutStep/CheckOutStep';
import { saveShippingInfo } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
  const naivgate = useNavigate()
  const alert = useAlert();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector(state => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmitHandle = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone number should be 10 digit.");
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, country, pincode, phoneNo }));
    naivgate('/order/confirm')
  }


  return (
    <>
      <CheckOutStep activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            encType='multipart/form-data'
            className="shippingForm"
            onSubmit={shippingSubmitHandle}
          >
            <div>
              <FaHome />
              <input
                type="text"
                placeholder='Address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <FaCity />
              <input
                type="text"
                placeholder='City'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <IoMdPin />
              <input
                type="number"
                placeholder='Pin Code'
                required
                value={pincode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <FaPhone />
              <input
                type="number"
                placeholder='Phone Number'
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <FaEarthAsia />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {
                  Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))
                }
              </select>
            </div>
            {
              country && (
                <div>
                  <FaPersonWalkingArrowRight />
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {
                      State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              )
            }
            <input
              type="submit"
              value="Continue"
              className='shippingBtn'
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Shipping
