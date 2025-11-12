import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Aos = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 data-aos="fade-up" className="text-4xl font-bold text-blue-600">
        Meet Our Expert
      </h1>
    </div>
  );
};

export default Aos;
