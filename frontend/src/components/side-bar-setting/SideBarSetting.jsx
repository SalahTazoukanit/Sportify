import { NavLink } from "react-router-dom";

const SideBarSetting = () => {
  const user_role = localStorage.getItem("user_role");
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
      </div>
    </>
  );
};
export default SideBarSetting;
