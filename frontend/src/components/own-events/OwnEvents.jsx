import axios from "axios";
import { useEffect, useState } from "react";

const OwnEvents = () => {
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
        console.log(response);
      });
  };

  useEffect(() => {
    getMyEvents();
  }, []);
  return <></>;
};
export default OwnEvents;
