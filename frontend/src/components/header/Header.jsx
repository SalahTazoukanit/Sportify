import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu

  const [isVisibleSettings, setIsVisibleSettings] = useState(false);

  const [userInfos, setUserInfos] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (image) {
      return "http://127.0.0.1:8000/storage/" + image;
    }
  };

  const logout = () => {
    axios
      .post("http://127.0.0.1:8000/api/v1/users/logout", {}, { headers })
      .then((response) => {
        alert(response.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_role");
        navigate("/sign-in");
      });
  };

  const getUserInfos = () => {
    axios
      .post("http://127.0.0.1:8000/api/v1/users/show", {}, { headers })
      .then((response) => {
        console.log(response);
        setUserInfos(response.data.user);
      });
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <div className="bg-third-color flex flex-col md:flex-row p-4 ">
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
        {!token && (
          <NavLink
            className={(nav) => (nav.isActive ? "nav-active" : "")}
            to={"/a-propos"}
          >
            À propos
          </NavLink>
        )}
        {!token && (
          <NavLink
            className={(nav) => (nav.isActive ? "nav-active" : "")}
            to={"/contact"}
          >
            Contact
          </NavLink>
        )}
        {!token && (
          <div className="btn flex justify-center items-center rounded">
            <NavLink to={"/sign-in"}>Connexion</NavLink>
          </div>
        )}
        {token ? (
          <div className="flex flex-col relative">
            <div
              onClick={() => setIsVisibleSettings((prev) => !prev)}
              className=""
            >
              {!userInfos.image_profile ? (
                <img
                  className="w-20 h-20 rounded-full hover:opacity-50 hover:cursor-pointer"
                  src="/src/assets/images/user.png"
                  alt="image utilisateur"
                />
              ) : (
                <img
                  className="w-20 h-20 rounded-full hover:opacity-50 hover:cursor-pointer"
                  src={getImageUrl(userInfos.image_profile)}
                  alt="image utilisateur"
                />
              )}
            </div>
            {isVisibleSettings ? (
              <div className="absolute text-black top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col italic z-10">
                <NavLink
                  className={(nav) => (nav.isActive ? "nav-active" : "")}
                  to={"/dashboard"}
                >
                  Mon profil
                </NavLink>
                <NavLink
                  to={"/events/my-favourites-events"}
                  className={(nav) => (nav.isActive ? "nav-active" : "")}
                >
                  Mes favoris
                </NavLink>
                <button onClick={logout} className="text-red-600">
                  Déconnexion
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Header;
