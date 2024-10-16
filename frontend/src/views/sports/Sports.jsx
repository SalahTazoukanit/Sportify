import axios from "axios";
import Header from "../../components/header/Header";
import "./Sports.css";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import { NavLink } from "react-router-dom";

const Sports = () => {
  const [categories, setCategories] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");

  const getCategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL_LARAVEL}/categories`)
      .then((response) => {
        setCategories(response.data.categories);
      });
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchBarValue.toLowerCase())
  );

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Header />
      <div className="banner-sports flex items-center">
        <h1 className="text-second-color font-semibold m-5 md:ml-10 max-sm:text-4xl">
          Sports
        </h1>
      </div>
      <div className="flex w-full justify-center">
        <div className="general-block flex justify-center rounded-md p-5 bg-third-color w-11/12 md:w-1/2">
          <input
            className="rounded-md w-full md:w-2/3 md:h-10 text-center"
            type="text"
            name="searchBar"
            placeholder="Cherchez votre sport"
            onChange={(e) => setSearchBarValue(e.target.value)}
            value={searchBarValue}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="general-block flex flex-wrap justify-center w-9/12 gap-5 md:gap-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
              >
                <NavLink to={`/sport-details/${category.id}`}>
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      className="w-64 h-32 object-cover rounded-t-lg"
                      src={
                        category.image
                          ? category.image
                          : "/src/assets/images/835001-best-of-2022-les-exploits-sportifs-de-nos-francais-cette-annee.jpg"
                      }
                      alt="image sport"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </NavLink>
              </div>
            ))
          ) : (
            <div>
              <p className="text-red-600">Aucune catégorie trouvée</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sports;
