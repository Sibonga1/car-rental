import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";

const App = () => {
  // State to control the visibility of the login component
  const [showLogin, setShowLogin] = useState(false);
  // Check if the current path starts with '/owner'
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  // Conditionally render the Navbar only if the current path does not start with '/owner'
  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>

     {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
