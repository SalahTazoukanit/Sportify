import axios from "axios";
import { useEffect, useState } from "react";

const MyParticipatedEvents = () => {
  const [myParticipatedEvents, setMyParticipatedEvents] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const showMyParticipatedEvents = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/events/showMyParticipatedEvents",
        {},
        { headers }
      )
      .then((response) => {
        setMyParticipatedEvents(response.data.myParticipatedEvents);
      });
  };

  useEffect(() => {
    showMyParticipatedEvents();
  }, []);
  return (
    <>
      {/* <div className="general-block flex flex-col items-center"> */}
      <div className="flex general-block justify-center">
        <div className="flex flex-col gap-5 items-center border bg-white w-10/12 pb-10">
          <div className="mt-5">
            <h2 className="">Événements passés et à venir</h2>
          </div>
          <div className="flex justify-center items-center w-5/6 md:gap-10 mt-5">
            {myParticipatedEvents &&
              myParticipatedEvents.map((myEvent) => (
                <div
                  className="flex flex-col border border-second-color rounded-md md:p-3"
                  key={myEvent.id}
                >
                  <h3 className="font-medium">{myEvent.name}</h3>
                  <h3> Date : {new Date(myEvent.date).toLocaleDateString()}</h3>
                  <p> Lieu : {myEvent.position}</p>
                  <h3>Places disponibles : {myEvent.aviable_places}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyParticipatedEvents;
