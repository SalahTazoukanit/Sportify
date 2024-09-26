import axios from "axios";
import { useEffect, useState } from "react";

const SettingUser = () => {
  const [user, setUser] = useState({});

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
        console.log(response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
      });
  };

  // const user = new FormData();

  // user.append("name", userUpload.name);
  // user.append("email", userUpload.email);
  // user.append("image_profile", userUpload.image_profile);
  // user.append("password", userUpload.password);
  // user.append("password_confirmation", userUpload.password_confirmation);

  // console.log("name => " + userUpload.name);
  // console.log("email => " + userUpload.email);
  // console.log("image_profile => " + userUpload.image_profile);
  // console.log("password => " + userUpload.password);
  // console.log("password_confirmation => " + userUpload.password_confirmation);

  // axios
  //   .post("http://127.0.0.1:8000/api/v1/users/updateUser?_method=PUT", user, {
  //     headers,
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   });
  // };

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          updateUser(e);
        }}
        encType="multipart/form-data"
        className="flex border rounded bg-white w-3/4 p-20 items-center gap-20"
      >
        <div className="flex flex-col w-1/2 gap-5">
          <h2 className="font-medium ">Configuration</h2>
          <div className="hidden md:block border"></div>
          <div className="flex flex-col gap-1">
            <input
              className="w-10/12 rounded border h-8 text-sm text-opacity-35"
              type="text"
              // placeholder={user.name}
              name="name"
              defaultValue={user.name}
              // value={user.name}
              onChange={(e) =>
                setUserUpload({ ...userUpload, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              className="w-10/12 rounded border h-8 text-sm"
              type="email"
              placeholder={user.email}
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
              placeholder="password"
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
              placeholder="password_confirmation"
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
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            {user.image_profile ? (
              <img
                className="rounded-full border-black md:w-40 md:h-40 hidden md:block "
                src={getImageUrl(user.image_profile)}
                alt=""
              />
            ) : (
              <img
                className="rounded-full border-black  md:w-40 md:h-40 hidden md:block "
                src="/src/assets/images/user.png"
                alt=""
              />
            )}
          </div>

          {/* <div className="flex flex-col items-center gap-5">
            <div className="rounded-full border font-medium text-second-color border-second-color p-2">
              <label htmlFor="imgProfile" className="cursor-pointer">
                Choisir Image
              </label>
              <input
                type="file"
                id="imgProfile"
                className="hidden"
                name="image_profile"
                defaultValue={user.image_profile}
                onChange={handleImageChange} // Aggiorna il nome del file quando cambia
              />
            </div>

            {fileName && (
              <p className="text-sm text-gray-600 mt-2">{fileName}</p>
            )}
          </div> */}
        </div>
      </form>
    </>
  );
};
export default SettingUser;
