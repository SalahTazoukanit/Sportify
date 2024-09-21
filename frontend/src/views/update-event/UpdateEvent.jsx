import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [event, setEvent] = useState({
    name: "",
    position: "",
    date: "",
    time: "",
    aviable_places: "",
    sport: "",
    description: "",
    image: "",
  });

  const [sport, selectedSport] = useState("");
  const [error, setError] = useState("");

  const getEventDetail = (id) => {
    axios.get("http://127.0.0.1:8000/api/v1/events/" + id).then((response) => {
      console.log(response.data.event);
      setEvent(response.data.event);
    });
  };

  const getCategories = () => {
    axios.get("http://127.0.0.1:8000/api/v1/categories/").then((response) => {
      setCategories(response.data.categories);
    });
  };

  useEffect(() => {
    getCategories();
    getEventDetail(id);
  }, []);
  return (
    <>
      <Header />
      <div className="general-block flex flex-col justify-center items-center">
        <h2 className="font-semibold">Modification d'événements</h2>
        <form
          encType="multipart/form-data"
          className="flex md:mt-5 md:mb-5 flex-col gap-2 w-full md:w-1/2 p-5"
        >
          <div className="title flex flex-col w-full">
            <label className="font-medium" htmlFor="">
              Nom événement
            </label>
            <input
              className="input-text"
              type="text"
              name="name"
              value={event.name}
              required
            />
          </div>
          <div className="date flex gap-2">
            <div className="title flex flex-col w-1/2">
              <label className="font-medium" htmlFor="">
                Date
              </label>
              <input
                className="input-text"
                type="date"
                name="date"
                value={event.date.split(" ")[0]}
                required
              />
            </div>
            <div className="title flex flex-col w-1/2">
              <label className="font-medium" htmlFor="">
                Horaires
              </label>
              <input
                className="input-text"
                type="time"
                name="time"
                value={event.time}
                required
              />
            </div>
          </div>
          <div className="title flex flex-col w-full">
            <label className="font-medium" htmlFor="">
              Lieu
            </label>
            <input
              className="input-text"
              type="text"
              name="position"
              value={event.position}
              placeholder="Ex: 123 Rue de l'Exemple, 75000 Paris"
              required
            />
          </div>
          <div className="title flex flex-col ">
            <label className="font-medium" htmlFor="">
              Places disponibles
            </label>
            <input
              className="input-text"
              type="number"
              name="aviable_places"
              value={event.aviable_places}
              placeholder="Ajoutez toujours un ou deux remplaçants pour plus de sécurité."
              required
            />
          </div>
          <div className="categories flex flex-col w-full flex-wrap ">
            <p className="font-medium">Sport</p>
            <div className="flex flex-col md:flex-row justify-between">
              {categories &&
                categories.map((category) => (
                  <div className="flex md:flex-col gap-2" key={category.id}>
                    <label> {category.name}</label>
                    <input
                      type="checkbox"
                      name="category_id"
                      value={category.id}
                      //   onChange={selectedSport}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="md:mt-5 md:mb-5 text-center">
            <h2 className="font-semibold">Details événement</h2>
          </div>
          <div>
            <input type="file" name="image" required />
            <br />
            {error && <span className="text-red-500"> {error} </span>}
          </div>
          <div className="description flex flex-col">
            <label className="font-medium" htmlFor="">
              Description
            </label>
            <textarea
              className="md:h-40 rounded"
              name="description"
              value={event.description}
              required
            ></textarea>
          </div>
          <div className="mt-5 bg-third-color p-2 rounded-md text-white text-center">
            <button type="submit">Créer événement</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default UpdateEvent;
