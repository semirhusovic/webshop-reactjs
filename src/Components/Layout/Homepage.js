import { Link } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import React,{useEffect, useState} from 'react';
import useFetch from "../../customHooks/useFetch";
import { API } from "../../apiRoutes";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay, Navigation,EffectFade,Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import ProductCard from "../ProductCard";
import './Homepage-slider.css';

function Homepage() {

  const { data: slides, loading: isLoading } = useFetch(
    API.url + API.slides
  );
  const { data: products, loading: productIsLoading } = useFetch(
    API.url + API.products
  );
  return (
    <>
    {/* // slider */}
    <div className="container mx-auto px-10 lg:w-3/5">
         {!isLoading && (
            <Swiper
            style={{
              "--swiper-navigation-color": "#2dd4bf",
              "--swiper-pagination-color": "#2dd4bf",
              "--swiper-navigation-size": "#2dd4bf",
              
            }}
              modules={[Pagination,Autoplay,Navigation,EffectFade]}
              navigation
              pagination={{
                clickable: true,
              }}
              effect
              speed={800}
              slidesPerView={1}
              loop
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >

{slides &&
          slides.map((s) => (


            <SwiperSlide key={s.id}>
               <a href={s.link} target="_blank" rel="noopener">
                  <img className="object-cover" src={API.imagePath + s.image.fileName} />
                  <div className="slide-text"><span>{s.title}</span></div>
               </a>
            </SwiperSlide>
          ))}
            
            </Swiper>
         )}
    </div>
    {/* // end slider */}

    {/* //products grid */}
    <div class="container w-5/6 mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    {/* //end products grid */}



    </>
  );
}

export default Homepage;