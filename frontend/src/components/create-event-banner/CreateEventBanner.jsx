import { NavLink } from "react-router-dom";
import "./CreateEventBanner.css";

const CreateEventBanner = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="general-block flex flex-col md:flex-row w-full justify-center items-center">
        <div className="create-events hidden md:block md:w-1/2 md:h-96"></div>
        <div className="flex flex-col sm:p-5 md:gap-10 m-5 w-11/12 md:w-1/2 justify-center md:pl-12 bg-third-color text-white rounded-lg">
          <div className="flex flex-col md:gap-5 p-5">
            <h2 className="font-semibold text-center md:text-left">
              Créez votre propre Événement
            </h2>
            <p className="hidden sm:block">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel,
              fuga?
            </p>
          </div>
          {token ? (
            <NavLink to={"/dashboard/my-events/add-event"}>
              <div className="bg-second-color w-full md:w-52 h-10 flex justify-center items-center rounded hover:opacity-90">
                <button className="w-full h-full">Créez un événement</button>
              </div>
            </NavLink>
          ) : (
            <NavLink to={"/sign-in"}>
              <div className="bg-second-color w-full md:w-52 h-10 flex justify-center items-center rounded hover:opacity-90">
                <button className="w-full h-full">Créez un événement</button>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};
export default CreateEventBanner;
