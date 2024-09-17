import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./EventDetail.css";
import Footer from "../../components/footer/Footer";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState("");

  const getImageUrl = (image) => {
    return "http://127.0.0.1:8000/storage/" + image;
  };

  const getEventDetail = (id) => {
    axios.get("http://127.0.0.1:8000/api/v1/events/" + id).then((response) => {
      console.log(response.data.event);
      setEvent(response.data.event);
    });
  };

  useEffect(() => {
    getEventDetail(id);
  }, [id]);
  return (
    <>
      <Header />
      <div className="banner-event flex items-center">
        {/* <h1 className="text-second-color font-semibold m-5 md:ml-10 max-sm:text-4xl">
          {event.name}
        </h1> */}
      </div>
      <div className="general-block flex justify-center">
        <div className="flex flex-col md:w-5/6 md:gap-5">
          <div className="flex md:justify-between items-center">
            <div className="">
              <h2 className="font-semibold">{event.name}</h2>
            </div>
            <div className="flex justify-center btn rounded-md text-white hover:opacity-50">
              <button className="hover:opacity-50">Participer</button>
            </div>
          </div>
          <div className="border"></div>
          <div className="flex max-sm:flex-wrap md:flex-row gap-10 mt-5">
            <img
              className="w-1/2 md:h-80 rounded-md"
              src={event.image ? getImageUrl(event.image) : ""}
              alt={event.name}
            />
            <div className="flex flex-col md:w-1/2 gap-5">
              <div className="flex gap-2">
                <h3 className="font-semibold italic">PLACES DISPONIBLES : </h3>
                <span className="opacity-50"> {event.aviable_places}</span>
              </div>
              <div className="border border-second-color"></div>
              <div className="flex gap-2">
                <h3 className="font-semibold italic">ÉVÉNEMENT PRÉVU LE :</h3>
                <span className="opacity-50">
                  {new Date(event.date).toLocaleDateString()} à {event.time}
                </span>
              </div>
              <div className="border border-third-color"></div>
              <div className="flex gap-2">
                <h3 className="font-semibold italic">EMPLACEMENT :</h3>
                <span className="opacity-50">{event.position}</span>
              </div>
            </div>
          </div>
          <div>{event.description && event.description}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EventDetail;
