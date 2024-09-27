import { NavLink } from "react-router-dom";
import AddFavouriteButton from "../add-favourite-button/AddFavouriteButton";

//props event gived from LastEvents.jsx
const Event = ({ event }) => {
  const getImageUrl = (image) => {
    if (image) {
      return "http://127.0.0.1:8000/storage/" + image;
    }
  };

  return (
    <>
      <div className="boxShadow shadow-custom bg-white rounded-xl flex flex-wrap justify-center p-1 md:p-6 ">
        <div className="flex flex-col md:w-full justify-center ">
          <NavLink to={`/events/event-details/${event.id}`}>
            <div className="flex justify-center items-center mb-1">
              <img
                className="md:w-full md:h-56 rounded w-2/3"
                src={
                  event.image.startsWith("images/events")
                    ? getImageUrl(event.image)
                    : "src/assets/images/sports-removebg-preview.png"
                }
                alt="image événement"
              />
            </div>
          </NavLink>
          <div>
            <h3 className="font-bold">{event.name}</h3>
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
                  <span className="font-semibold text-second-color">
                    {event.aviable_places && event.aviable_places}
                  </span>
                </p>
              ) : (
                <p className="text-rouge-500 font-semibold underline opacity-65">
                  Événement complet .
                </p>
              )}
              <AddFavouriteButton eventId={event.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
