import axios from "axios";
import { useEffect, useState } from "react";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const MyParticipatedEvents = () => {
  const [myParticipatedEvents, setMyParticipatedEvents] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const showMyParticipatedEvents = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/events/showMyParticipatedEvents",
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
        <h2 className="">Événements passés et à venir</h2>
      </div>
      <div className=" flex flex-wra justify-center ">
        {/* <div className="flex flex-wrap gap-2 justify-center items-center w-5/6 md:gap-10 mt-5"> */}
        <Swiper
          slidesPerView={1}
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
              slidesPerView: 4,
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
                <div className="mb-5 flex flex-col rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ">
                  <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-xs">
                    {"Le " +
                      new Date(myEvent.date).toLocaleDateString() +
                      " à " +
                      myEvent.time}
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      {myEvent.name}
                    </h3>
                    <p className="mb-4 text-medium text-neutral-600 dark:text-neutral-200">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <p className="text-xs">{myEvent.position}</p>
                  </div>
                  <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                    <div>2 days ago</div>
                    {/* <div>
                    <button
                      type="button"
                      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Button
                    </button>
                  </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* </div> */}
      </div>

      {/* </div> */}
      {/* <div className="general-block flex flex-col items-center"> */}
      {/* <div className="flex general-block justify-center">
        <div className="flex flex-col gap-5 items-center border bg-white w-10/12 pb-10">
          <div className="mt-5">
            <h2 className="">Événements passés et à venir</h2>
          </div>
          <div className="flex justify-center items-center w-5/6 md:gap-10 mt-5">
            {myParticipatedEvents &&
              myParticipatedEvents.map((myEvent) => (
                <div
                  className="flex flex-col border border-second-color rounded-md md:p-3"
                  key={myEvent.id}
                >
                  <h3 className="font-medium">{myEvent.name}</h3>
                  <h3> Date : {new Date(myEvent.date).toLocaleDateString()}</h3>
                  <p> Lieu : {myEvent.position}</p>
                  <h3>Places disponibles : {myEvent.aviable_places}</h3>
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </>
  );
};
export default MyParticipatedEvents;
