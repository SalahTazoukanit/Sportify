import axios from "axios";
import { useEffect, useState } from "react";

const SettingUser = () => {
  const [user, setUser] = useState({});

  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [userUpload, setUserUpload] = useState({
    name: "",
    email: "",
    image_profile: "",
    password: "",
    password_confirmation: "",
  });

  const [fileName, setFileName] = useState(""); // Stato per il nome del file

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const getUserInfos = () => {
    axios
      .post("http://127.0.0.1:8000/api/v1/users/show", {}, { headers })
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Prende il primo file (l'immagine selezionata)
    if (file) {
      setFileName(file.name); // Aggiorna lo stato con il nome del file
    }
    setUser(user.image_profile);
  };

  const getImageUrl = (image) => {
    return "http://127.0.0.1:8000/storage/" + image;
  };

  const updateUser = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (userUpload.name) {
      formData.append("name", userUpload.name);
    }

    if (userUpload.email) {
      formData.append("email", userUpload.email);
    }

    if (userUpload.image_profile) {
      formData.append("image_profile", userUpload.image_profile);
    }
    console.log(userUpload.image_profile);

    if (userUpload.password) {
      formData.append("password", userUpload.password);
      formData.append(
        "password_confirmation",
        userUpload.password_confirmation
      );
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/v1/users/updateUser?_method=PUT",
        formData,
        {
          headers,
        }
      )
      .then((response) => {
        setMessage(response.data.message);

        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(null);
        }, 3000);
        // window.location.reload();
      });
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        {/* <div className="flex flex-col w-1/4 ml-10">
          <h3>Configuration</h3>
          <h3>Mes Favoris</h3>
          <div>Regalges</div>
          <div>myEvents</div>
          <div>myPartecipatedEvents</div>
        </div> */}
        <div className="flex flex-col w-3/4 mr-10">
          <div className="flex flex-col gap-10">
            <form
              onSubmit={(e) => {
                updateUser(e);
              }}
              encType="multipart/form-data"
              className="flex border rounded bg-white w-3/4 p-20 items-center gap-20"
            >
              <div className="flex flex-col w-1/2 gap-5">
                <h2 className="font-medium " id="configuration">
                  Configuration
                </h2>
                <div className="hidden md:block border"></div>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-10/12 rounded border h-8 text-sm text-opacity-35"
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={(e) =>
                      setUserUpload({ ...userUpload, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-10/12 rounded border h-8 text-sm"
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    onChange={(e) =>
                      setUserUpload({ ...userUpload, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-10/12 rounded border h-8 text-sm"
                    type="password"
                    placeholder="********"
                    name="password"
                    defaultValue={user.password}
                    onChange={(e) =>
                      setUserUpload({ ...userUpload, password: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-10/12 rounded border h-8 text-sm"
                    type="password"
                    placeholder="********"
                    name="password_confirmation"
                    defaultValue={user.password_confirmation}
                    onChange={(e) =>
                      setUserUpload({
                        ...userUpload,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-center bg-second-color text-white p-1 border rounded-full border-second-color w-1/3 mt-5">
                  <button type="submit">Sauvegarder</button>
                </div>
                {isVisible && <div className="message">{message}</div>}
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <div>
                  {user.image_profile ? (
                    <img
                      className="rounded-full border-black  md:w-40 md:h-40 hidden md:block "
                      src={getImageUrl(user.image_profile)}
                      alt=""
                    />
                  ) : (
                    <img
                      className="rounded-full border-black  md:w-40 md:h-40 hidden md:block "
                      src="/src/assets/images/user.png"
                      alt="image utilisateur"
                    />
                  )}
                </div>

                <div className="flex flex-col border p-2 border-black rounded-full hover:opacity-50">
                  <label htmlFor="input-image">Choisir une image</label>
                  <input
                    id="input-image"
                    type="file"
                    className="hidden px-3 py-2 text-lg  rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#ffffff]"
                    placeholder="Type your name.."
                    name="image_profile"
                    defaultValue={user.image_profile}
                    onChange={(e) =>
                      setUserUpload({
                        ...userUpload,
                        image_profile: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingUser;
