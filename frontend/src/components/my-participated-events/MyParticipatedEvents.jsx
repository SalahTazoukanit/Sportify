import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import RemoveParticipant from "../remove-participant-button/RemoveParticipant";

const MyParticipatedEvents = () => {
  const [myParticipatedEvents, setMyParticipatedEvents] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const showMyParticipatedEvents = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/events/showMyParticipatedEvents`,
        {},
        { headers }
      )
      .then((response) => {
        setMyParticipatedEvents(response.data.myParticipatedEvents);
      });
  };

  useEffect(() => {
    showMyParticipatedEvents();
  }, []);
  return (
    <>
      <div className="general-block flex flex-col w-full items-center ">
        <h2 id="participes" className="text-center">
          Événements participés et à venir
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper general-block"
        >
          {myParticipatedEvents &&
            myParticipatedEvents.map((myEvent) => (
              <SwiperSlide key={myEvent.id}>
                <div className="mb-10 flex flex-col rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 h-full">
                  <NavLink to={`/events/event-details/${myEvent.id}`}>
                    <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-sm">
                      {"Le " +
                        new Date(myEvent.date).toLocaleDateString() +
                        " à " +
                        myEvent.time}
                    </div>
                    <div className="p-6 h-32 overflow-hidden">
                      <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {myEvent.name}
                      </h3>
                      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-200">
                        {myEvent.description.slice(0, 100)}
                      </p>
                      <p className="text-xs">{myEvent.position}</p>
                    </div>
                  </NavLink>
                  <RemoveParticipant eventId={myEvent.id} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};
export default MyParticipatedEvents;
