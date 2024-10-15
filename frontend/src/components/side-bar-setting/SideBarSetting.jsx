import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SideBarSetting = () => {
  const user_role = localStorage.getItem("user_role");
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const headers = {
    Authorization: "Bearer " + token,
  };

  const deleteUser = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/users/deleteUser/${id}`,
        {
          headers,
        }
      )
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_role");
        Swal.fire({
          text: response.data.message,
          icon: "success",
        });
        navigate("/sign-up");
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center w-11/12 sm:w-40 md:w-56 md:mt-10 bg-white p-5 rounded-md gap-3 mx-auto">
        <NavLink to={"/dashboard/my-events/add-event"}>
          <p className="font-normal hover:opacity-80 hover:text-green-800">
            Ajouter événement +
          </p>
        </NavLink>
        {user_role === "admin" ? (
          <NavLink to={"/dashboard/categories/add-category"}>
            <p className="font-normal hover:opacity-80 hover:text-green-800">
              Ajouter sport +
            </p>
          </NavLink>
        ) : null}
        <a className="hover:opacity-50 italic" href="#configuration">
          Configuration
        </a>
        <a className="hover:opacity-50 italic" href="#evenements">
          Événements
        </a>
        <a className="hover:opacity-50 italic" href="#participes">
          Participés
        </a>
        <div className="bg-red-900 rounded text-white hover:opacity-50">
          <button onClick={() => setIsVisible(true)} className="w-full">
            Supprimer mon compte
          </button>
        </div>
      </div>
      {isVisible ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-11/12 sm:w-96">
            <p className="text-center mb-4 italic">
              Êtes-vous sûr(e) de vouloir supprimer votre compte ?
            </p>
            <div className="flex gap-5">
              <button
                className="bg-red-900 text-white rounded w-full hover:opacity-50 py-2"
                onClick={() => deleteUser(user_id)}
              >
                Oui
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="bg-gray-500 text-white rounded w-full hover:opacity-50 py-2"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default SideBarSetting;
