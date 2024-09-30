import { NavLink } from "react-router-dom";

const SideBarSetting = () => {
  return (
    <>
      <div className="flex flex-col justify-center  italic  w-40 md:w-56 mt-10 bg-white p-5 rounded-md gap-3">
        <NavLink to={"/dashboard/my-events/add-event"}>
          <p className="font-normal hover:opacity-80 hover:text-green-800">
            + Ajouter événement
          </p>
        </NavLink>
        <a className="hover:opacity-50 italic" href="#configuration">
          Configuration
        </a>
        <a className="hover:opacity-50 italic" href="#evenements">
          Événements
        </a>
        <a className="hover:opacity-50 italic" href="#participes">
          Participés
        </a>
      </div>
    </>
  );
};
export default SideBarSetting;
