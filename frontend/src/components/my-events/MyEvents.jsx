import axios, { spread } from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getMyEvents = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/events/getOwnEvents/",
        {},
        { headers }
      )
      .then((response) => {
        setMyEvents(response.data.events);
      });
  };

  const deleteEvent = (e, id) => {
    axios
      .delete("http://127.0.0.1:8000/api/v1/events/delete/" + id, {
        headers,
      })
      .then((reponse) => {
        alert(reponse.data.message);
        window.location.reload();
      });
  };

  useEffect(() => {
    getMyEvents();
  }, []);
  return (
    <>
      <div className="general-block">
        <div className="flex flex-col bg-white">
          <div className="flex mb-5 justify-center">
            <h3 className="w-1/6"></h3>
            <h3 className="w-1/6 font-semibold">Événement</h3>
            <h3 className="w-1/6 font-semibold">Status</h3>
            <div className="flex justify-center items-center gap-10">
              <h3 className="p-1"></h3>
              <h3 className="p-1"></h3>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {myEvents &&
              myEvents.map((myEvent) => (
                <div
                  key={myEvent.id}
                  className="flex justify-center items-center"
                >
                  <div className="md:w-1/6 hidden md:block">
                    <img
                      className="md:w-40"
                      src={myEvent.image}
                      alt={myEvent.name}
                    />
                  </div>
                  <h3 className="md:w-1/6">{myEvent.name}</h3>
                  <h3 className="md:w-1/6 hidden md:block">
                    {myEvent.status && myEvent.status === "pending" ? (
                      <span className="text-orange-500 italic">En Attente</span>
                    ) : (
                      <span className="text-second-color italic">Publié</span>
                    )}
                  </h3>
                  <div className="flex justify-center items-center gap-10">
                    <div className="bg-green-500 text-white p-1 rounded">
                      <NavLink>
                        <button>Modifier</button>
                      </NavLink>
                    </div>
                    <div className="bg-red-500 text-white p-1 rounded">
                      <button onClick={(e) => deleteEvent(e, myEvent.id)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyEvents;
