import { NavLink } from "react-router-dom";

const AddEventButton = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="flex justify-center bg-second-color md:p-2 text-white font-semibold italic rounded-full w-40 md:w-56">
          <NavLink to={"/dashboard/add-event"}>Ajouter événement </NavLink>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default AddEventButton;
