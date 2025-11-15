import React from "react";
import Marquee from "react-fast-marquee";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";
import slide6 from "../assets/slide6.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (

    
    <div>


      <div className="bg-gray-200 text-blue-500 py-2">
      <Marquee
        gradient={false} 
        speed={50}       
        pauseOnHover={true} 
      >
       <span  className="mx-8">
        Report potholes, broken streetlights, or any city issues - your voice matters! 
       </span>

                 <span className="mx-10">
            Contribute to making your city greener and cleaner - join FixMyCity now!
          </span>


                    <span className="mx-10">
             Every report helps! Track issues, share ideas, and help improve our community.”
          </span>

      
      </Marquee>
    </div>

      <div className="mb-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="rounded-lg overflow-hidden"
      >
        <SwiperSlide>
          <img src={slide1} className="w-full h-[400px] object-cover" alt="Slide 1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slide2} className="w-full h-[400px] object-cover" alt="Slide 2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slide3} className="w-full h-[400px] object-cover" alt="Slide 3" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slide4} className="w-full h-[400px] object-cover" alt="Slide 4" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slide5} className="w-full h-[400px] object-cover" alt="Slide 5" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slide6} className="w-full h-[400px] object-cover" alt="Slide 6" />
        </SwiperSlide>
      </Swiper>
    </div>
    </div>
  );
};

export default Banner;
