import axios from "axios";
import Header from "../../components/header/Header";
import "./Events.css";
import Event from "../../components/event-card/Event.jsx";
import { useState, useEffect } from "react";
import CreateEventBanner from "../../components/create-event-banner/CreateEventBanner";
import Footer from "../../components/footer/Footer.jsx";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [filteredEvents, setFilteredEvents] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const getCategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/categories/`)
      .then((response) => {
        setCategories(response.data.categories);
      });
  };

  const filterEventsByCategory = (categoryName) => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_URL_LARAVEL
        }/categories/filterEventsByCategory/` + categoryName
      )
      .then((response) => {
        const elementFounded = response.data.allEvents;
        setFilteredEvents(elementFounded);
        setError("");
        if (elementFounded.length === 0) {
          setError("Aucun événement disponible pour ce sport.");
        } else {
          setError("");
        }
      });
  };

  const handleSelect = (e) => {
    const category = e.target.value;
    setCategoryName(category);
    filterEventsByCategory(category);
  };

  const getEvents = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/events/`)
      .then((response) => {
        setEvents(response.data.events);
      });
  };

  const getEventsByName = (searchBar) => {
    setError("");
    axios
      .get(
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/events/filterEventsByName/` +
          searchBar
      )
      .then((response) => {
        setFilteredEvents(response.data.event);
        if (response.data.event.length === 0) {
          setError("Aucun événement n'a été trouvé.");
        }
      });
  };

  const handleInputChange = (e) => {
    const event = e.target.value;
    setSearchBar(event);
    getEventsByName(event);
  };

  useEffect(() => {
    getEvents();
    getCategories();
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
        <div className="flex justify-center w-11/12 md:w-5/6 bg-third-color border rounded-xl ">
          <div className="flex flex-col gap-2 md:flex-row justify-center items-center w-full p-10 rounded-l-lg md:gap-10">
            <select
              className="rounded w-full text-center md:text-sm md:h-10"
              name="select"
              id=""
              onChange={handleSelect}
              value={categoryName}
            >
              <option name="option" value="">
                Rechercher selon le sport
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
            </select>
            <input
              className="rounded w-full text-center md:h-10"
              onChange={handleInputChange}
              name="searchBar"
              value={searchBar}
              type="text"
              placeholder="Rechercher"
            />
          </div>
        </div>
      </div>
      {searchBar || categoryName ? (
        <div className="general-block ">
          <div className="flex flex-wrap justify-center m-10 gap-2">
            {filteredEvents &&
              // Filtra eventi con stato diverso da "pending"
              filteredEvents
                .filter((event) => event.status !== "pending")
                .map((filteredEvent) => (
                  <div className="md:w-1/4" key={filteredEvent.id}>
                    <Event className="w-40" event={filteredEvent} />
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <div className="general-block ">
          <div className="flex flex-wrap justify-center m-10 gap-2">
            {events &&
              // Filtra eventi con stato diverso da "pending"
              events
                .filter((event) => event.status !== "pending")
                .map((event) => (
                  <div className="md:w-1/4" key={event.id}>
                    <Event className="w-40" event={event} />
                  </div>
                ))}
          </div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center md:h-80">
          <h2 className="text-red-500 font-semibold">{error}</h2>
        </div>
      )}
      <div className="general-block">
        <CreateEventBanner />
      </div>
      <Footer />
    </>
  );
};

export default Events;
