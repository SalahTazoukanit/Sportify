import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./EventDetail.css";

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
        <h1 className="text-second-color font-semibold m-5 md:ml-10 max-sm:text-4xl">
          {event.name}
        </h1>
      </div>
      <div className="general-block flex justify-center">
        <div className="flex flex-col md:w-5/6 md:gap-5">
          <div>
            <h2 className="font-semibold">{event.name}</h2>
          </div>
          <div className="border "></div>
          <div>
            <img
              className="md:w-1/3 md:h-80 rounded-md"
              src={event.image ? getImageUrl(event.image) : ""}
              alt={event.name}
            />
          </div>
          <div>{}</div>
        </div>
      </div>
      <div className="general-block"></div>
    </>
  );
};
export default EventDetail;
