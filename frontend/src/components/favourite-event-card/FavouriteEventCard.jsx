import axios from "axios";
import { NavLink } from "react-router-dom";

//props event gived from LastEvents.jsx
const FavouriteEventCard = ({ event }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getImageUrl = (image) => {
    if (image) {
      return "http://127.0.0.1:8000/storage/" + image;
    }
  };

  const removeEventFromFavourites = (id) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/v1/events/removeEventFromFavourites/${id}`,
        {},
        { headers }
      )
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      });
  };

  return (
    <>
      <div className="flex rounded-2xl w-80 bg-[#ffffff] shadow-xl">
        <div className="flex flex-col justify-between p-8 ">
          <NavLink to={`/events/event-details/${event.id}`}>
            <div className="text-2xl font-bold pb-6">
              <h3>{event.name}</h3>
            </div>
            <div>
              <p>Le {new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className=" text-sm   text-[#374151]">
              <h3>{event.description.slice(0, 30)}</h3>
            </div>
          </NavLink>
          <div className="flex justify-end pt-6">
            <button
              onClick={() => removeEventFromFavourites(event.id)}
              className="bg-second-color text-[#ffffff] font-bold text-xs  p-3 rounded-lg hover:bg-third-color active:scale-95 transition-transform transform"
            >
              Supprimer des favoris
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FavouriteEventCard;
