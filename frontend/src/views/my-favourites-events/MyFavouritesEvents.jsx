import axios from "axios";
import { useEffect, useState } from "react";
import FavouriteEventCard from "../../components/favourite-event-card/FavouriteEventCard";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./MyFavouritesEvents.css";

const MyFavouritesEvents = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const [favouritesEvents, setFavouritesEvents] = useState([]);

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getMyFavourites = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/events/showMyFavourites",
        {},
        { headers }
      )
      .then((response) => {
        setFavouritesEvents(response.data.favourites_events);
      });
  };

  useEffect(() => {
    getMyFavourites();
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-banner flex items-center">
        <h1 className="text-orange-500 font-semibold m-5 md:ml-10 max-sm:text-4xl">
          Mes Favoris
        </h1>
      </div>
      <div className="general-block flex justify-center items-start">
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center gap-10">
            {favouritesEvents &&
              favouritesEvents.map((favouriteEvent) => (
                <FavouriteEventCard
                  key={favouriteEvent.id}
                  event={favouriteEvent}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MyFavouritesEvents;
