import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./SportDetails.css";

const SportDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");

  const getCategoryById = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/categories/${id}`)
      .then((response) => {
        console.log(response.data.category);
        setCategory(response.data.category);
      });
  };

  const getImageUrl = (image) => {
    if (image) {
      return "http://127.0.0.1:8000/storage" + image;
    }
  };

  const verifImage = () => {
    if (category.image) {
      return getImageUrl(category.image);
    } else {
      return "/src/assets/images/835001-best-of-2022-les-exploits-sportifs-de-nos-francais-cette-annee.jpg";
    }
  };

  useEffect(() => {
    getCategoryById(id);
  }, [id]);

  return (
    <>
      <Header />
      <div
        className="flex items-center"
        style={{
          backgroundImage: `url(${verifImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="text-second-color font-semibold m-5 md:ml-10 max-sm:text-4xl">
          {category.name}
        </h1>
      </div>
      <div className="general-block flex flex-col justify-center items-center min-h-96">
        <div className="box-sport flex flex-col items-center w-11/12 md:w-1/2 rounded-md gap-10 p-10 border">
          <div>
            <h2>{category.name}</h2>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Histoire</h3>
            <p>{category.history}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Regles du jeux</h3>
            <p>{category.rules}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SportDetails;
