import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import "./EventDetail.css";
import Footer from "../../components/footer/Footer";
import AddFavouriteButton from "../../components/add-favourite-button/AddFavouriteButton";

const EventDetail = () => {
  const { id } = useParams();

  const [event, setEvent] = useState("");
  const [event_user, setEventUser] = useState("");

  const [event_category, setEventCategory] = useState("");

  const [participants, setParticipants] = useState([]);

  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getImageUrl = (image) => {
    return "http://127.0.0.1:8000/storage/" + image;
  };

  const getEventDetail = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/events/` + id)
      .then((response) => {
        console.log(response.data.event);
        setEvent(response.data.event);
        setEventUser(response.data.event.user.name);
        setEventCategory(response.data.event.category.name);
      });
  };

  const getParticipants = (id) => {
    axios
      .post(
        `${
          import.meta.env.VITE_BACK_URL_LARAVEL
        }/events/${id}/showParticipantsEvent`,
        {},
        { headers }
      )
      .then((response) => {
        console.log(response.data.event.participants);
        setParticipants(response.data.event.participants);
      });
  };

  const participateToEvent = (id) => {
    axios
      .post(
        `${
          import.meta.env.VITE_BACK_URL_LARAVEL
        }/events/${id}/participateToEvent`,
        {},
        {
          headers,
        }
      )
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        if (error) {
          setMessage("Vous êtes déjà inscrit à cet événement .");
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 3000);
        }
      });
    // alert(response.data.message);
  };

  useEffect(() => {
    getEventDetail(id);
    getParticipants(id);
  }, [id]);
  return (
    <>
      <Header />
      <div className="general-block w-full flex justify-center">
        <div className="flex flex-col justify-center md:justify-start md:w-3/6 gap-5">
          {/* mex */}
          {isVisible && <p className="italic">{message}</p>}
          {/* mex */}
          <h2 className="mb-5 max-sm:text-center">
            {event.name && event.name}
          </h2>
          <div className="flex flex-col gap-5 md:flex-row justify-between items-center md:items-start">
            <div className="w-2/3">
              <img
                className=""
                src={
                  event.image
                    ? getImageUrl(event.image)
                    : "/src/assets/images/sports-removebg-preview.png"
                }
                alt="image événement"
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
              <div className="flex items-center gap-2">
                {token ? (
                  <div
                    onClick={() => participateToEvent(event.id)}
                    className="flex w-1/2 md:w-56 justify-center bg-third-color rounded-md text-white hover:opacity-50 hover:cursor-pointer p-2"
                  >
                    <p>Participer</p>
                  </div>
                ) : (
                  <NavLink to={"/sign-in"}>
                    <div className="flex w-1/2 md:w-56 justify-center bg-third-color rounded-md text-white hover:opacity-50 hover:cursor-pointer p-2">
                      <p>Participer</p>
                    </div>
                  </NavLink>
                )}
                <AddFavouriteButton eventId={event.id} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 max-sm:items-center ">
            <div className="flex flex-col">
              <h3 className="font-semibold">Description</h3>
              <p>{event.description}</p>
            </div>
            <div className="flex gap-10 md:gap-0">
              <div className="flex flex-col md:w-1/2 gap-3">
                <div className="flex-col">
                  <h3 className="font-semibold">Adresse événement</h3>
                  <p className="italic">{event.position}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold">Participants</h3>
                  <div className="flex gap-2">
                    {participants &&
                      participants.map((participant) => (
                        <div key={participant.id}>
                          <p className="italic">{participant.name + " ,"}</p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex-col">
                  <h3 className="font-semibold">
                    Publié par
                    <p className="italic">{event_user}</p>
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex-col gap-3">
                  <h3 className="font-semibold">Sport</h3>
                  <p className="italic ">{event_category}</p>
                </div>
                {event.aviable_places > 0 ? (
                  <div className="flex-col gap-3">
                    <h3 className="font-semibold">Places encore disponibles</h3>
                    <p className="italic ">{event.aviable_places}</p>
                  </div>
                ) : (
                  <div>
                    <p className="italic text-red-500">
                      Il ne reste plus de places.
                    </p>
                  </div>
                )}
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
