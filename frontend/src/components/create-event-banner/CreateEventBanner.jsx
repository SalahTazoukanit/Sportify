import { NavLink } from "react-router-dom";
import "./CreateEventBanner.css";

const CreateEventBanner = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="general-block flex w-full justify-center">
        <div className="create-events hidden md:block md:w-1/2 md:h-96"></div>
        <div className="flex flex-col sm:p-5 md:gap-10 m-5 w-full md:w-1/2 justify-center md:pl-12 mr-0 bg-third-color text-white">
          <div className="flex flex-col md:gap-5 p-5">
            <h2 className="font-semibold ">Créez votre propre Événement</h2>
            <p className="max-sm:hidden">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel,
              fuga?
            </p>
          </div>
          {token && token ? (
            <NavLink to={"/dashboard/my-events/add-event"}>
              <div className="bg-second-color md:w-52 md:h-10 flex justify-center rounded">
                <button className="">Créez un événement</button>
              </div>
            </NavLink>
          ) : (
            <NavLink to={"/sign-in"}>
              <div className="bg-second-color md:w-52 md:h-10 flex justify-center rounded">
                <button className="">Créez un événement</button>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};
export default CreateEventBanner;
