import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
// import required modules
import {Autoplay, EffectFade,Pagination,FreeMode, Navigation, Thumbs } from "swiper";
import { API } from "../../apiRoutes";

  function SingleItemGallery({images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  return (
    <>
    <Swiper
     style={{
      "--swiper-navigation-color": "#2dd4bf",
      "--swiper-pagination-color": "#2dd4bf",
      "--swiper-navigation-size": "#2dd4bf",
    }}
      modules={[Pagination,Autoplay,Navigation,EffectFade,Thumbs,FreeMode]}
      navigation
      pagination={{
        clickable: true,
      }}
      effect
      speed={800}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >

          {images &&
          images.map((image) => (
            <SwiperSlide key={image.fileName}>
            <img src={API.imagePath + image.fileName} />
          </SwiperSlide>
          ))}
      </Swiper>
    
    </>
  )
}

export default SingleItemGallery