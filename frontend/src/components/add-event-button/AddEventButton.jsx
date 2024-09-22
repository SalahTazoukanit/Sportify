import { NavLink } from "react-router-dom";

const AddEventButton = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="flex justify-center hover:bg-second-color hover:text-white italic rounded-full w-40 md:w-56">
          <NavLink to={"/dashboard/my-events/add-event"}>
            Ajouter événement{" "}
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default AddEventButton;
