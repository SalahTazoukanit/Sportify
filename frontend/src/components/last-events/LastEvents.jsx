import { NavLink } from "react-router-dom";
import Event from "../event-card/Event";
import SeeMoreButton from "../see-more-button/SeeMoreButton";
import axios from "axios";
import { useEffect, useState } from "react";

const LastEvents = () => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/events`)
      .then((response) => {
        const sortedEvents = response.data.events.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setEvents(sortedEvents);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className="general-block flex flex-col items-center">
        <div className="flex flex-col justify-center w-5/6">
          <h2 className="text-start font-semibold">
            Nos derniers événements disponibles
          </h2>
          <div className="general-block grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {events &&
              events
                .slice(0, 4)
                .map((event) => <Event key={event.id} event={event} />)}
          </div>
        </div>
        <div className="general-block">
          <NavLink to={"/events"}>
            <SeeMoreButton />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LastEvents;
