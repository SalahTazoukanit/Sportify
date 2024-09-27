import React, { useState } from "react";
import axios from "axios";

const AddFavouriteButton = ({ eventId }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const addEventToFavourites = (id) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/v1/events/addEventToFavourites/${id}`,
        {},
        { headers }
      )
      .then((response) => {
        alert(response.data.message);
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
