/* eslint-disable */
import { NavLink } from "react-router-dom";
import AddFavouriteButton from "../add-favourite-button/AddFavouriteButton";

//props event gived from LastEvents.jsx
const Event = ({ event }) => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="boxShadow shadow-custom bg-white rounded-xl flex flex-wrap justify-center p-1 md:p-6 ">
        <div className="flex flex-col md:w-full justify-center max-sm:p-5">
          <NavLink to={`/events/event-details/${event.id}`}>
            <div className="flex justify-center items-center mb-1">
              <img
                className="md:w-full md:h-56 rounded w-10/12"
                src={event.image}
                alt="image événement"
              />
            </div>
          </NavLink>
          <div className="flex flex-col max-sm:justify-center max-sm:items-center">
            <p className="font-semibold">{event.name}</p>
            <p className="text-third-color opacity-65">
              {event.description.slice(0, 30) + "..."}
            </p>
            <p className="text-third-color opacity-65 ">
              {new Date(event.date).toLocaleDateString()} à {event.time}
            </p>
            <p className="text-third-color opacity-65 ">
              Lieu : {event.position && event.position.slice(0, 15)}
            </p>
            <div className="flex gap-5 md:justify-between">
              {event.aviable_places > 0 ? (
                <p className="text-third-color font-medium opacity-65 ">
                  Places disponibles :
                  <span className="font-semibold">
                    {event.aviable_places && event.aviable_places}
                  </span>
                </p>
              ) : (
                <p className="text-rouge-500 font-semibold underline opacity-65">
                  Événement au complet .
                </p>
              )}
              {token && <AddFavouriteButton eventId={event.id} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
