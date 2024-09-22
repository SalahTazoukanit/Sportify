import { useEffect, useState } from "react";
import axios from "axios";
import SeeMoreButton from "../see-more-button/SeeMoreButton";
import { NavLink } from "react-router-dom";
import "../../index.css";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const Sport = () => {
  const [sports, setSports] = useState([]);

  const getSports = () => {
    axios.get("http://127.0.0.1:8000/api/v1/categories").then((response) => {
      setSports(response.data.categories);
    });
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <>
      <div className="general-block flex flex-col">
        <div className="flex flex-wrap flex-col md:w-full">
          <h2 className="text-center font-semibold">
            Découvrez tous les sports disponibles
          </h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper general-block"
          >
            {sports &&
              sports.map((sport) => (
                <SwiperSlide
                  className="mb-10 flex justify-center"
                  key={sport.id}
                >
                  <div className="flex flex-col justify-center items-center sm:w-full gap-1">
                    <img
                      className="rounded-md"
                      src="src/assets/images/piotr-osmenda-20K-JZ2ppbE-unsplash.jpg"
                      alt=""
                    />
                    <h3 className="font-medium "> {sport.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="mt-5">
          <NavLink to={"/sports"}>
            <SeeMoreButton />
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Sport;
