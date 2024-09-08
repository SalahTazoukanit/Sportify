import { NavLink } from "react-router-dom";

const SeeMoreButton = () => {
  return (
    <>
      <NavLink to={"/events"}>
        <div className="flex justify-center">
          <div className="general-block btn text-white rounded bg-second-color flex justify-center items-center ">
            <button>Voir plus ..</button>
          </div>
        </div>
      </NavLink>
    </>
  );
};
export default SeeMoreButton;
