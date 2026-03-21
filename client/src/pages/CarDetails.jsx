import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyData } from "../assets/assets";
import { useEffect, useState } from "react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    setCar(dummyData.find(car => car._id === id));
  }, [id]);

return car ? (
<div className="px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
<button>
  <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65"/>
  Back to all cars
</button>
</div>
) : <p>Loading......</p>
}

export default CarDetails;
