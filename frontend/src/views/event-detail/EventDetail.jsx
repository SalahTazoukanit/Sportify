import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./EventDetail.css";
import Footer from "../../components/footer/Footer";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState("");
  const [event_user, setEventUser] = useState("");
  const [event_category, setEventCategory] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getImageUrl = (image) => {
    return "http://127.0.0.1:8000/storage/" + image;
  };

  const getEventDetail = (id) => {
    axios.get("http://127.0.0.1:8000/api/v1/events/" + id).then((response) => {
      console.log(response.data.event);
      setEvent(response.data.event);
      setEventUser(response.data.event.user.name);
      setEventCategory(response.data.event.category.name);
    });
  };

  const participateToEvent = (id) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/v1/events/${id}/participateToEvent`,
        {},
        {
          headers,
        }
      )
      .then((response) => {
        alert(response.data.message);
      });
  };

  useEffect(() => {
    getEventDetail(id);
  }, [id]);
  return (
    <>
      <Header />
      <div className="general-block w-full flex justify-center">
        <div className="flex flex-col justify-start md:w-3/6 gap-5">
          <h2 className="mb-5">{event.name && event.name}</h2>
          <div className="flex flex-col gap-5 md:flex-row justify-between ">
            <div className="w-2/3">
              <img
                className=""
                src={
                  event.image
                    ? getImageUrl(event.image)
                    : "/src/assets/images/sports-removebg-preview.png"
                }
              />
            </div>
            <div className="date-block flex flex-col max-sm:w-1/2 gap-2 bg-white p-5 h-48 rounded-md">
              <div className="flex flex-col md:gap-2">
                <div>
                  <h3 className="font-bold">Date && Horaires</h3>
                </div>
                <div>Date : {new Date(event.date).toLocaleDateString()} </div>
                <div>Horaires : {event.time} </div>
              </div>
              <div className="flex w-1/2 md:w-56 justify-center bg-third-color rounded-md text-white hover:opacity-50 p-2">
                <button
                  onClick={() => participateToEvent(event.id)}
                  className="hover:opacity-50"
                >
                  Participer
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h3 className="font-semibold">Description</h3>
              <p>
                {event.description} Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Non nulla corporis adipisci recusandae ipsum
                molestiae deleniti, velit alias, aspernatur ad error,
                consequuntur cum! Recusandae similique nam voluptatum. Facere,
                necessitatibus fugiat?
              </p>
            </div>
            <div className="flex">
              <div className="flex flex-col md:w-1/2 gap-3">
                <div className="flex-col">
                  <h3 className="font-semibold">Adresse événement</h3>
                  <p className="italic">{event.position}</p>
                </div>
                <div className="flex-col">
                  <h3 className="font-semibold">
                    Publié par{" "}
                    <span className="italic font-normal">{event_user}</span>
                  </h3>
                </div>
              </div>
              <div className="flex-col gap-3">
                <h3 className="font-semibold">Sport</h3>
                <p className="italic ">{event_category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>EVENEMENTS DE LA MEME CATEGORIE</div> */}
      <Footer />
    </>
  );
};
export default EventDetail;
