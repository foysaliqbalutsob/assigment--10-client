// src/components/Slider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";         // React components
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // modules you want

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation                // prev/next buttons
        pagination={{ clickable: true }} // pagination bullets
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        <SwiperSlide>
          <div style={{ padding: 20, background: "#f2f2f2", height: 200 }}>
            <h3>Slide 1</h3>
            <p>Content for slide 1</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={{ padding: 20, background: "#e8f5ff", height: 200 }}>
            <h3>Slide 2</h3>
            <p>Content for slide 2</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={{ padding: 20, background: "#fff3e0", height: 200 }}>
            <h3>Slide 3</h3>
            <p>Content for slide 3</p>
          </div>
        </SwiperSlide>

        {/* আরো slides যোগ করতে পারো */}
      </Swiper>
    </div>
  );
}
