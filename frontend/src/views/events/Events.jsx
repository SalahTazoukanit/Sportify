import axios from "axios";
import Header from "../../components/header/Header";
import "./Events.css";
import Event from "../../components/event-card/Event.jsx";
import { useState, useEffect } from "react";
import CreateEventBanner from "../../components/create-event-banner/CreateEventBanner";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [filteredEvents, setFilteredEvents] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [error, setError] = useState("");
  // const [eventsByCategoryName, setEventsByCategoryName] = useState("");

  const getCategories = () => {
    axios.get("http://127.0.0.1:8000/api/v1/categories/").then((response) => {
      console.log(response.data.categories);
      setCategories(response.data.categories);
    });
  };

  const filterEventsByCategory = (categoryName) => {
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/categories/filterEventsByCategory/" +
          categoryName
      )
      .then((response) => {
        console.log(response.data.allEvents);

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
    console.log(category);

    setCategoryName(category);
    filterEventsByCategory(category);
  };

  const getEvents = () => {
    axios.get("http://127.0.0.1:8000/api/v1/events/").then((response) => {
      console.log(response.data.events);
      setEvents(response.data.events);
    });
  };

  const getEventsByName = (searchBar) => {
    setError("");
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/events/filterEventsByName/" + searchBar
      )
      .then((response) => {
        console.log(response);
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
        <div className="flex justify-center md:w-5/6 bg-third-color border rounded-xl ">
          <div className="flex flex-col gap-2 md:flex-row justify-center items-center md:w-3/5 p-10 rounded-l-lg md:gap-10">
            <select
              className="rounded md:w-full max-sm:w-3/4 text-center text-sm md:h-10"
              name="select"
              id=""
              onChange={handleSelect}
              value={categoryName}
            >
              <option name="option" value="">
                Selectionnez selon le sport
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
            </select>
            <input
              className="rounded md:w-full max-sm:w-3/4 text-center md:h-10"
              onChange={handleInputChange}
              name="searchBar"
              value={searchBar}
              type="text"
              placeholder="Rechercher"
            />
            <div className="flex justify-center bg-second-color rounded">
              <img
                className=" text-white hidden md:block"
                src="src/assets/images/icons8-search-50.png"
                alt="image search"
              />
            </div>
          </div>
        </div>
      </div>
      {searchBar || categoryName ? (
        <div className="general-block ">
          <div className="flex flex-wrap justify-center m-10 gap-2">
            {filteredEvents &&
              filteredEvents.map((filteredEvent) => (
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
              events.map((event) => (
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
      <div>footer</div>
    </>
  );
};

export default Events;
