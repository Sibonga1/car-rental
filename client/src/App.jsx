import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Dashboard from "./pages/owner/Dashboard";
import Layout from "./pages/owner/Layout";
import Login from "./components/Login";

const App = () => {
  // State to control the visibility of the login component
  const [showLogin, setShowLogin] = useState(false);
  // Check if the current path starts with '/owner'
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  // Conditionally render the Navbar only if the current path does not start with '/owner'
  return (
    
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Owner Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

     {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
