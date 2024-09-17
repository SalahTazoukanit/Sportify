import axios from "axios";
import Header from "../../components/header/Header";
import "./Sports.css";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";

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
      <div className="general-block flex justify-center"></div>
      <Footer />
    </>
  );
};
export default Sports;
