import axios from "axios";
import Header from "../../components/header/Header";
import "./Sports.css";
import { useEffect, useState } from "react";

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
      <div className="general-block flex justify-center">
        <div className="flex justify-center md:w-5/6 bg-third-color border rounded-xl">
          <div className="flex justify-center md:w-3/5 p-10 rounded-l-lg gap-5">
            <select
              className="rounded md:w-full text-center text-sm"
              name=""
              id=""
              onChange={handleSelect}
              value={categoryName}
            >
              <option value="">Selectionner la categorie recherchée</option>
              {categories &&
                categories.map((category) => (
                  <option
                    key={category.id}
                    // onChange={set}
                  >
                    {category.name}
                  </option>
                ))}
            </select>

            <input
              // onChange={handleInputChange}
              // value={searchBar}
              className="rounded md:w-full text-center"
              type="text"
              placeholder="Rechercher "
            />
            {/* <div className="flex justify-center bg-second-color rounded">
              <img
                className="w-8 text-white hidden md:block"
                src="src/assets/images/icons8-search-50.png"
                alt="image search"
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sports;
