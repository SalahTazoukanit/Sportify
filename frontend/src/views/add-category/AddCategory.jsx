import axios from "axios";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const titleRef = useRef(null);
  const historyRef = useRef(null);
  const rulesRef = useRef(null);
  const imageRef = useRef(null);

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const navigate = useNavigate();

  const addCategory = (e) => {
    e.preventDefault();

    const category = new FormData();
    category.append("name", titleRef.current.value);
    category.append("history", historyRef.current.value);
    category.append("rules", rulesRef.current.value);

    const imageFile = imageRef.current.files[0];
    if (imageFile && imageFile.size > 2 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 2 Mo.");
      return;
    } else {
      category.append("image", imageFile);
    }

    axios
      .post(
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/categories/store`,
        category,
        { headers }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/dashboard");
      });
  };

  return (
    <>
      <Header />
      <div className="general-block flex flex-col justify-center items-center">
        <h2 className="font-semibold">Création sport </h2>
        <form
          onSubmit={(e) => addCategory(e)}
          encType="multipart/form-data"
          className="flex md:mt-5 md:mb-5 flex-col gap-2 w-full md:w-1/2 p-5"
        >
          <div className="title flex flex-col w-full">
            <label className="font-medium" htmlFor="name">
              Nom sport
            </label>
            <input
              id="name"
              className="input-text"
              type="text"
              name="name"
              required
              ref={titleRef}
            />
          </div>
          <div className="description flex flex-col">
            <label className="font-medium" htmlFor="history">
              Histoire
            </label>
            <textarea
              id="history"
              className="md:h-40 rounded"
              name="history"
              required
              ref={historyRef}
            ></textarea>
          </div>
          <div className="description flex flex-col">
            <label className="font-medium" htmlFor="rules">
              Règles du jeux
            </label>
            <textarea
              id="rules"
              className="md:h-40 rounded"
              name="rules"
              required
              ref={rulesRef}
            ></textarea>
          </div>
          <div className="title flex flex-col w-full">
            <label className="font-medium" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              className="input-text"
              type="file"
              name="image"
              required
              ref={imageRef}
            />
            <br />
            {error && <span className="text-red-500"> {error} </span>}
          </div>
          <div className="mt-5 bg-third-color p-2 rounded-md text-white text-center">
            <button type="submit">Créer sport</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default AddCategory;
