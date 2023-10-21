import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Footer from "./components/Footer";
import React, { createContext, useEffect, useState } from "react";
import { ToggleDim } from "./functions/DimFunctions.js";
import BecomeHost from "./screens/BecomeHost";
import ProfilePage from "./screens/ProfilePage";
import PlacesPage from "./components/Places Components/PlacesPage";
import PlacePage from "./components/Places Components/placePage";
import Cookies from 'js-cookie';
import PlacesByCountry from "./components/Places Components/PlacesByCountry";
import BookingPage from "./components/Profile Components/BookingPage";
import BookedPage from "./components/Profile Components/BookedPage";
import BookingPlace from "./components/Profile Components/BookingPlace";
import BookedPlace from "./components/Profile Components/BookedPlace";
import PlacesSearch from "./screens/PlacesSearch";
import axios from "axios";


export const MyContext = React.createContext();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {

  const [showPopup, setShowPopup] = useState(false);
  const [isHomepage, setisHomepage] = useState(true);
  const [type, settype] = useState('All');
  const [selectedcategoryindex, setselectedcategoryindex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const delayedAction = () => {
      setisLoading(false);
    };

    const timeoutId = setTimeout(delayedAction, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  function togglePopup() {
    ToggleDim();
    setShowPopup(!showPopup);
  }

  function removePopup() {
    setShowPopup(false);
  }

  const myCookieValue = Cookies.get('token');


  useEffect(() => {
    if (!myCookieValue) {
      localStorage.removeItem("userID")
    }

  }, [myCookieValue]);


  return (
    <MyContext.Provider value={{
      showPopup,
      setShowPopup,
      togglePopup,
      removePopup,
      isHomepage,
      setisHomepage,
      type,
      settype,
      selectedcategoryindex,
      setselectedcategoryindex,
      isEdit,
      setIsEdit,
      isLoading
    }}>
        <BrowserRouter basename="/app">
          <Navbar></Navbar>
          <main className="Main_container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Host" element={<BecomeHost />} />
              <Route path="/user/show/:id" element={<ProfilePage />} />
              <Route path="/places" element={<PlacesPage />} />
              <Route path="/places/:country" element={<PlacesByCountry />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/user/bookings" element={<BookingPage />} />
              <Route path="/user/bookings/:id" element={<BookingPlace />} />
              <Route path="/user/booked" element={<BookedPage />} />
              <Route path="/user/booked/:id" element={<BookedPlace />} />
              <Route path="/places/:country/:checkin/:checkout/:guests" element={<PlacesSearch />} />
            </Routes>
            <Footer></Footer>
          </main>
        </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
