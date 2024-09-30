import axios from "axios";
import Header from "../../components/header/Header";
import "./Sports.css";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import { NavLink } from "react-router-dom";

const Sports = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const getCategories = () => {
    axios.get("http://127.0.0.1:8000/api/v1/categories/").then((response) => {
      console.log(response.data.categories);
      setCategories(response.data.categories);
    });
  };

  const filterEventsByCategory = (categoryName) => {
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/categories/filterEventsByCategory/" +
          categoryName
      )
      .then((response) => {
        console.log(response);
      });
  };
  const getImageUrl = (image) => {
    return "http://127.0.0.1:8000/storage/" + image;
  };

  const handleSelect = (e) => {
    const category = e.target.value;
    console.log(category);

    setCategoryName(category);
    filterEventsByCategory(category);
  };

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
        <div className="general-block flex justify-center rounded-md p-5 bg-third-color w-1/2">
          <input
            className="rounded-md w-1/2 md:h-10"
            type="text"
            name=""
            id=""
            placeholder="Cherchez votre categorie"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="general-block flex flex-wrap justify-center w-9/12 gap-10">
          {categories &&
            categories.map((category) => (
              <div
                key={category.id}
                className="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
              >
                <NavLink>
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      className="rounded-t-lg"
                      src={
                        category.imagge
                          ? getImageUrl(category.image)
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
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Sports;
