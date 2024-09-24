import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="general-block">
        <div className="flex flex-col md:gap-2 bg-third-color md:h-48 items-center">
          <div className="flex">
            <img
              className="w-32 md:w-48"
              src="/src/assets/images/logoSportifyOrangetVert.png"
              alt=""
            />
          </div>
          <div className="border w-5/6"></div>
          <div className="flex w-full justify-around ">
            <div className="flex justify-center items-center">
              <div>
                <img
                  className="w-8 rounded-full"
                  src="/src/assets/images/insta-logo.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="w-8 rounded-full"
                  src="/src/assets/images/fb-logo.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="w-8 rounded-full"
                  src="/src/assets/images/x-logo.png"
                  alt=""
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-5 text-white">
              <NavLink to={"/"}>Accueil</NavLink>
              <NavLink to={"/events"}>Evénements</NavLink>
              <NavLink to={"/sports"}>Sports</NavLink>
              <NavLink to={"/a-propos"}>A propos</NavLink>
              <NavLink to={"/legal-mentions"}>Mentions légales</NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
            </div>
          </div>
          <div className="flex">
            <p className="text-white text-xs">
              Non Copyrighted © 2024 Realisé par Salaheddine Tazoukanit
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
