import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddFavouriteButton = ({ eventId }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const addEventToFavourites = (id) => {
    axios
      .post(
        `${
          import.meta.env.VITE_BACK_URL_LARAVEL
        }/events/addEventToFavourites/${id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.fire({
          text: response.data.message,
          icon: "success",
        });
      });
  };

  return (
    <>
      <div>
        <button onClick={() => addEventToFavourites(eventId)}>
          <img
            className="w-5"
            src="/src/assets/images/heart.png"
            alt="heart icon"
          />
        </button>
      </div>
    </>
  );
};

export default AddFavouriteButton;
