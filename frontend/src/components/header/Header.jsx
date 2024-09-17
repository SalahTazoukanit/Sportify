import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const navigate = useNavigate();

  const logout = () => {
    axios
      .post("http://127.0.0.1:8000/api/v1/users/logout", {}, { headers })
      .then((response) => {
        alert(response.data.message);
        localStorage.removeItem("token");
        navigate("/");
      });
  };

  return (
    <div className="bg-third-color flex flex-col md:flex-row p-4">
      <div className="flex justify-between items-center w-full md:w-1/4">
        <img
          className="w-32 md:w-48"
          src="/src/assets/images/logoSportifyOrangetVert.png"
          alt="image logo sportify"
        />
        {/* Menu hamburger pour les petits écrans */}
        <button
          className="block md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Icône hamburger */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menu des liens de navigation */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col md:flex-row justify-around items-center gap-3 text-white w-full mt-4 md:mt-0 md:flex`}
      >
        <NavLink
          className={(nav) => (nav.isActive ? "nav-active" : "")}
          to={"/"}
        >
          Accueil
        </NavLink>
        <NavLink
          className={(nav) => (nav.isActive ? "nav-active" : "")}
          to={"/events"}
        >
          Événements
        </NavLink>
        <NavLink
          className={(nav) => (nav.isActive ? "nav-active" : "")}
          to={"/sports"}
        >
          Sports
        </NavLink>
        {token ? (
          <NavLink
            className={(nav) => (nav.isActive ? "nav-active" : "")}
            to={"/dashboard"}
          >
            Mon Profil
          </NavLink>
        ) : (
          ""
        )}
        <NavLink
          className={(nav) => (nav.isActive ? "nav-active" : "")}
          to={"/a-propos"}
        >
          À propos
        </NavLink>
        <NavLink
          className={(nav) => (nav.isActive ? "nav-active" : "")}
          to={"/contact"}
        >
          Contact
        </NavLink>
        {!token ? (
          <div className="btn flex justify-center items-center rounded">
            <NavLink to={"/sign-in"}>Connexion</NavLink>
          </div>
        ) : (
          <div className="bg-orange-500 p-1 flex justify-center items-center rounded">
            <button onClick={logout}>Déconnexion</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
