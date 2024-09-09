import { useEffect, useState } from "react";
import axios from "axios";
import SeeMoreButton from "../see-more-button/SeeMoreButton";
import { NavLink } from "react-router-dom";
const Sport = () => {
  const [sports, setSports] = useState([]);

  const getSports = () => {
    axios.get("http://127.0.0.1:8000/api/v1/categories").then((response) => {
      setSports(response.data.categories);
    });
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <>
      <div className="general-block flex flex-col">
        <div className="flex flex-wrap flex-col md:w-full">
          <h2 className="text-center font-semibold">
            Découvrez tous les sports disponibles
          </h2>
          <div className="flex flex-col md:flex-row gap-5 m-5 md:gap-5 md:m-10">
            {sports &&
              sports.slice(0, 5).map((sport) => (
                <div
                  key={sport.id}
                  className="flex flex-col justify-center items-center sm:w-full gap-1"
                >
                  <img
                    className="rounded-md"
                    src="src/assets/images/piotr-osmenda-20K-JZ2ppbE-unsplash.jpg"
                    alt=""
                  />
                  <h3 className="font-medium "> {sport.name}</h3>
                </div>
              ))}
          </div>
        </div>
        <NavLink to={"/sports"}>
          <SeeMoreButton />
        </NavLink>
      </div>
    </>
  );
};
export default Sport;
