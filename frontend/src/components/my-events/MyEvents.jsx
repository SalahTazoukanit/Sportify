import axios, { spread } from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getImageUrl = (image) => {
    if (image) {
      return "http://127.0.0.1:8000/storage/" + image;
    }
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
        <div className="flex flex-col">
          <div className="flex flex-col gap-3 w-full items-center">
            <h2 className="font-semibold text-center">Tous vos Événements</h2>
            {myEvents &&
              myEvents.map((myEvent) => (
                <div
                  key={myEvent.id}
                  className="flex justify-center items-center md:w-2/3 border-b md:p-2"
                >
                  <div className="md:w-1/6 hidden md:block">
                    <img
                      className="md:w-40 rounded-md"
                      src={
                        myEvent.image.startsWith("images/events")
                          ? getImageUrl(myEvent.image)
                          : "src/assets/images/sports-removebg-preview.png"
                      }
                      alt={myEvent.name}
                    />
                  </div>
                  <h3 className="md:w-1/6">{myEvent.name}</h3>
                  <h3 className="md:w-1/6">
                    {new Date(myEvent.date).toLocaleDateString()}
                  </h3>
                  <h3 className="md:w-1/6 hidden md:block">
                    {myEvent.status && myEvent.status === "pending" ? (
                      <span className="text-orange-500 italic">En Attente</span>
                    ) : (
                      <span className="text-second-color italic">Publié</span>
                    )}
                  </h3>
                  <div className="flex justify-center items-center gap-10">
                    <div className="bg-green-500 text-white p-1 rounded hover:opacity-50">
                      <NavLink to={`/dashboard/my-events/update/${myEvent.id}`}>
                        <button>Modifier</button>
                      </NavLink>
                    </div>
                    <div className="bg-red-500 text-white p-1 rounded hover:opacity-50">
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
