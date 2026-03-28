import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  // State to manage the selected pickup location from the dropdown menu
  const [pickupLocation, setPickupLocation] = useState("");

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">Cars to rent</h1>

      <form
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full
      w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min:ml-8 md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              // value of the select input is bound to the pickupLocation state , and onChange event updates the state when a new location is selected
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)} // The onChange event handler updates the pickupLocation state with the selected value from the dropdown menu
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">PickUp Location</option>
              {/* Map through the cityList array to create options for each city */}
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation ? pickupLocation : "Please select location"}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">pick-up date</label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]} // Set minimum date to today
              className="text-sm text-gray-500"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">return date</label>
            <input
              type="date"
              id="return-date"
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>
        <button
          className="flex items-center justify-center gap-1 px-9 
          py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </button>
      </form>

      <img src={assets.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;
