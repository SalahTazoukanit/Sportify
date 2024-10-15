import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [event, setEvent] = useState({
    name: "",
    position: "",
    date: "",
    time: "",
    aviable_places: "",
    category_id: "",
    description: "",
    image: "",
  });

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const navigate = useNavigate();

  const getEventDetail = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/events/` + id)
      .then((response) => {
        console.log(response.data.event);
        setEvent(response.data.event);
      });
  };

  const getCategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/categories`)
      .then((response) => {
        setCategories(response.data.categories);
      });
  };

  const updateEvent = (e) => {
    e.preventDefault();

    console.log(event);

    const eventUpdated = new FormData();

    eventUpdated.append("name", event.name);
    eventUpdated.append("position", event.position);
    eventUpdated.append("description", event.description);
    eventUpdated.append("time", event.time);
    eventUpdated.append("date", event.date);
    eventUpdated.append("image", event.image);
    eventUpdated.append("category_id", event.category_id);

    if (event.image.size > 2 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 2 Mo.");
    }

    console.log(event.image);

    axios
      .post(
        `${
          import.meta.env.VITE_BACK_URL_LARAVEL
        }/events/update/${id}?_method=PUT`,
        eventUpdated,
        {
          headers,
        }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/dashboard");
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
          onSubmit={(e) => updateEvent(e)}
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
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
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
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
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
                onChange={(e) => setEvent({ ...event, time: e.target.value })}
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
              placeholder="Ex: 123 Rue de l'Exemple, 75000 Paris"
              value={event.position}
              onChange={(e) => setEvent({ ...event, position: e.target.value })}
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
              placeholder="Ajoutez toujours un ou deux remplaçants pour plus de sécurité."
              value={event.aviable_places}
              onChange={(e) =>
                setEvent({ ...event, aviable_places: e.target.value })
              }
              required
            />
          </div>
          <div className="categories flex flex-col w-full flex-wrap ">
            <p className="font-medium">Sport</p>
            <div className="flex flex-col md:flex-row justify-between">
              <select
                name="category_id"
                id=""
                onChange={(e) =>
                  setEvent({ ...event, category_id: e.target.value })
                }
                className="input-text"
              >
                <option value="">Selctionner la categorie</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="md:mt-5 md:mb-5 text-center">
            <h2 className="font-semibold">Details événement</h2>
          </div>
          <div>
            <input
              type="file"
              name="image"
              onChange={(e) => setEvent({ ...event, image: e.target.files[0] })}
              required
            />
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
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
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
