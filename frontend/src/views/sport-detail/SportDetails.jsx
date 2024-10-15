import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./SportDetails.css";
import Swal from "sweetalert2";

const SportDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const user_role = localStorage.getItem("user_role");
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const getCategoryById = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/categories/${id}`)
      .then((response) => {
        setCategory(response.data.category);
      });
  };

  const deleteCategory = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/categories/delete/${id}`,
        { headers }
      )
      .then((response) => {
        Swal.fire({
          text: response.data.message,
          icon: "success",
        });
        navigate("/sports");
      });
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
          backgroundImage: `url(${category.image})`,
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
          {user_role && user_role === "admin" ? (
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-white bg-third-color w-full py-3 px-4 rounded-md"
              >
                Supprimer
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SportDetails;
