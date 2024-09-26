import axios from "axios";

const RemoveParticipant = ({eventId}) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token,
  };

  const removeMeAsParticipant = (id) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/v1/events/removeMeAsParticipant/${id}`,
        {},
        {
          headers,
        }
      )
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      });
  };
  return (
    <>
      <div className="flex bg-third-color hover:cursor-pointer text-white justify-center border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        <div onClick={() => removeMeAsParticipant(eventId)} className="flex">
          <p>Ne plus participer / Supprimer</p>
        </div>
      </div>
    </>
  );
};
export default RemoveParticipant;
