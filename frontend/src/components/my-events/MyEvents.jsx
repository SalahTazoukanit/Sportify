import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MyEvents.css";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null); // Stato per identificare quale evento sta cambiando lo stato
  const [updatedStatus, setUpdatedStatus] = useState(""); // Stato per il nuovo stato selezionato

  const token = localStorage.getItem("token");
  const user_role = localStorage.getItem("user_role");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getMyEvents = () => {
    if (user_role === "member") {
      axios
        .post(
          `${import.meta.env.VITE_BACK_URL_LARAVEL}/events/getOwnEvents/`,
          {},
          { headers }
        )
        .then((response) => {
          setMyEvents(response.data.events);
        });
    } else if (user_role === "admin") {
      axios
        .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/events/`)
        .then((response) => {
          setMyEvents(response.data.events);
        });
    }
  };

  const deleteEvent = (e, id) => {
    axios
      .delete(`${import.meta.env.VITE_BACK_URL_LARAVEL}/events/delete/` + id, {
        headers,
      })
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      });
  };

  const handleStatusChange = (eventId) => {
    // Esegui la chiamata API per aggiornare lo stato dell'evento nel server
    axios
      .post(
        `${
          import.meta.env.VITE_BACK_URL_LARAVEL
        }/events/changeStatus/${eventId}?_method=PUT`,
        { status: updatedStatus },
        { headers }
      )
      .then((response) => {
        // Aggiorna lo stato dell'evento anche lato client dopo aver ricevuto risposta dal server
        const updatedEvents = myEvents.map((event) => {
          if (event.id === eventId) {
            return { ...event, status: updatedStatus };
          }
          return event;
        });
        setMyEvents(updatedEvents);
        setEditingEventId(null); // Nascondi il select dopo aver salvato
      });
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <>
      <div className="general-block ">
        {user_role === "member" ? (
          <h2 className="font-semibold text-center" id="evenements">
            Mes Événements
          </h2>
        ) : (
          <h2 id="evenements" className="font-semibold text-center">
            Tous les Événements
          </h2>
        )}
      </div>

      <div className="flex general-block justify-center">
        <div className="flex flex-col gap-5 items-center border bg-white w-full md:w-10/12 pb-10 pt-10 px-5">
          <div className="flex w-full text-xs md:w-10/12">
            <div className="w-1/6 text-center hidden md:block">
              <p>Horaires</p>
            </div>
            <div className="w-1/6 text-center hidden md:block">
              <p>Date</p>
            </div>
            <div className="w-1/6 text-center hidden md:block">
              <p>Événement</p>
            </div>
            <div className="w-1/6 text-center hidden md:block">
              <p>Status</p>
            </div>
            <div className="w-1/6 text-center">
              <p></p>
            </div>
            <div className="w-1/6 text-center">
              <p></p>
            </div>
          </div>
          {myEvents &&
            myEvents.map((myEvent) => (
              <div
                key={myEvent.id}
                className="flex flex-col md:flex-row justify-between items-center w-full md:w-10/12 gap-4 max-sm:border max-sm:p-5"
              >
                <h3 className="w-1/6 text-center hidden md:block ">
                  {myEvent.time}
                </h3>
                <h3 className="w-1/6 text-center hidden md:block">
                  {new Date(myEvent.date).toLocaleDateString()}
                </h3>
                <h3 className="w-full md:w-1/6 text-start max-sm:font-medium">
                  {myEvent.name}
                </h3>
                <h3 className="w-full md:w-1/6 text-center">
                  {editingEventId === myEvent.id ? (
                    <>
                      <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        className="text-xs border rounded"
                      >
                        <option value="pending">En Attente</option>
                        <option value="published">Publié</option>
                      </select>
                      <button
                        className="ml-2 text-green-500 text-xs hover:opacity-50"
                        onClick={() => handleStatusChange(myEvent.id)}
                      >
                        Enregistrer
                      </button>
                    </>
                  ) : (
                    <span className="opacity-70 italic flex gap-2">
                      <span>
                        {myEvent.status === "pending" ? "En Attente" : "Publié"}
                      </span>
                      {user_role === "admin" ? (
                        <button
                          onClick={() => {
                            setEditingEventId(myEvent.id);
                            setUpdatedStatus(myEvent.status);
                          }}
                          className="text-third-color text-xs hover:opacity-50"
                        >
                          changer
                        </button>
                      ) : (
                        <span className="text-xs invisible">changer</span>
                      )}
                    </span>
                  )}
                </h3>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-third-color text-white p-1 rounded hover:opacity-50">
                    <NavLink to={`/dashboard/my-events/update/${myEvent.id}`}>
                      <button>Modifier</button>
                    </NavLink>
                  </div>
                  <div className="bg-red-900 text-white p-1 rounded hover:opacity-50">
                    <button onClick={(e) => deleteEvent(e, myEvent.id)}>
                      Supprimer
                    </button>
                  </div>
                  <NavLink to={`/events/event-details/${myEvent.id}`}>
                    <div>
                      <p className="italic font-semibold text-green-900">
                        Voir plus...
                      </p>
                    </div>
                  </NavLink>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyEvents;
