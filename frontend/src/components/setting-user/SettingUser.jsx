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

  const [fileName, setFileName] = useState("");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };

  const getUserInfos = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/users/show`,
        {},
        { headers }
      )
      .then((response) => {
        setUser(response.data.user);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    setUser(user.image_profile);
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
        `${import.meta.env.VITE_BACK_URL_LARAVEL}/users/updateUser?_method=PUT`,
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

        setTimeout(() => {
          location.reload();
        }, 3000);
      });
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full lg:w-3/4 p-5 lg:mr-10">
          <div className="flex flex-col gap-10">
            <form
              onSubmit={(e) => updateUser(e)}
              encType="multipart/form-data"
              className="flex flex-col lg:flex-row border rounded bg-white w-full p-5 md:p-10 lg:p-20 items-center gap-10 lg:gap-20"
            >
              <div className="flex flex-col w-full lg:w-1/2 gap-5">
                <h2 className="font-medium maw-sm:text-lg" id="configuration">
                  Configuration
                </h2>
                <div className="hidden md:block border"></div>
                <div className="flex flex-col gap-1">
                  <input
                    className="input-text rounded border text-sm"
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
                    className="input-text rounded border text-sm"
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
                    className="input-text rounded border text-sm"
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
                    className="input-text rounded border text-sm"
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
                <div className="flex justify-center items-center color-btn-green text-white p-1 border rounded-full input-text">
                  <button className="w-full" type="submit">
                    Sauvegarder
                  </button>
                </div>
                {isVisible && <div className="message">{message}</div>}
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <div>
                  {user.image_profile ? (
                    <img
                      className="rounded-full border-black w-32 h-32 md:w-40 md:h-40"
                      src={user.image_profile}
                      alt="Profile"
                    />
                  ) : (
                    <img
                      className="rounded-full border-black w-32 h-32 md:w-40 md:h-40"
                      src="/src/assets/images/user.png"
                      alt="image utilisateur"
                    />
                  )}
                </div>

                <div className="flex flex-col border p-2 border-black rounded-full hover:opacity-75">
                  <label htmlFor="input-image" className="cursor-pointer">
                    Choisir une image
                  </label>
                  <input
                    id="input-image"
                    type="file"
                    className="hidden"
                    name="image_profile"
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
