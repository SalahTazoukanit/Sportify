import axios from "axios";
import Header from "../../components/header/Header";
import "./Events.css";
import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchBar, setSearchBar] = useState(""); // State pour garder la valeur de l'input

  const getEvents = () => {
    axios.get("http://127.0.0.1:8000/api/v1/events/").then((response) => {
      console.log(response.data.events);
      setEvents(response.data.events);
    });
  };

  const getEventsByName = (searchBar) => {
    // Reçois le terme recherché ici
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/events/filterEventsByName/" + searchBar
      )
      .then((response) => {
        console.log(response);
      });
  };

  // Appel de la fonction à chaque changement de l'input
  const handleInputChange = (e) => {
    const event = e.target.value;
    setSearchBar(event); // Met à jour la valeur de l'input
    getEventsByName(event); // Passe la valeur de l'input à la fonction de filtre
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="banner-events flex items-center">
        <h1 className="text-second-color font-semibold m-5 md:ml-10 max-sm:text-4xl">
          Événements
        </h1>
      </div>
      <div className="general-block flex justify-center">
        <div className="flex justify-center md:w-5/6 bg-third-color border rounded-xl">
          <div className="flex justify-center w-2/5 p-10 rounded-l-lg gap-1">
            <input
              onChange={handleInputChange} // Appel de la fonction à chaque changement
              value={searchBar} // Synchronisation de l'input avec le state
              className="input-text text-center"
              type="text"
              placeholder="Rechercher"
            />
            <div className="flex justify-center bg-second-color rounded">
              <img
                className="w-8 text-white"
                src="src/assets/images/icons8-search-50.png"
                alt="image search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="general-block "></div>
    </>
  );
};

export default Events;
