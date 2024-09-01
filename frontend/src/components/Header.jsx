import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-third-color flex justify-center items-center gap-32">
        <div className="flex items-center gap-32 w-11/12">
          <div>
            <img
              className="w-48"
              src="/src/assets/images/logoSportifyOrangetVert.png"
              alt="image logo sportify"
            />
          </div>
          <div className="flex justify-center items-center gap-24 text-white">
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
              Evenements
            </NavLink>
            <NavLink
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              to={"/sports"}
            >
              Sports
            </NavLink>
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
            <div className="btn flex justify-center items-center rounded">
              <NavLink to={"/sign-in"}>Connexion</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
