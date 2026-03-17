import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div
      className='flex flex-col md:flex-row md:items-start iterms-center justify-between
    px-8 min:pl-14 md:pl-14 pt-10 bg-gradient-primary max-w-6xl 
    mx-3 md:mx-auto rounded-2xl overflow-hidden'
    >
      <div className="text-white">
        <h2 className="text-3xl font-medium">Do you want a luxury car?</h2>
        <p className="mt-2">
          monetize your vehicle effectively by listing it on CarRental{" "}
        </p>
        <p className="max-w-130">
          We take care of insurance, driver verification and secure payments -
          so you can earn passive income, stress-free.
        </p>

        <button
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary 
            rounnded-lg text-sm mt-4 cursor-pointer"
        >
          list your cars
        </button>
      </div>
      <img
        src={assets.banner_car_image}
        alt="car banner"
        className="max-h-45 mt-10"
      />
    </div>
  );
};

export default Banner;
