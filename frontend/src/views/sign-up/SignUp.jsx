import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image_profile: "",
    password: "",
    password_confirmation: "",
  });

  const [errorMex, setErrorMex] = useState("");

  const [imagePreview, setImagePreview] = useState(null); // Nuovo stato per l'anteprima dell'immagine

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const userAdded = new FormData();
    userAdded.append("name", user.name);
    userAdded.append("email", user.email);

    if (user.image_profile) {
      userAdded.append("image_profile", user.image_profile);
    }

    userAdded.append("password", user.password);
    userAdded.append("password_confirmation", user.password_confirmation);

    axios
      .post("http://127.0.0.1:8000/api/v1/users/register", userAdded)
      .then((response) => {
        alert(response.data.message);
        navigate("/sign-in");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Imposta l'anteprima dell'immagine
      };
      reader.readAsDataURL(file); // Leggi il file come URL
      setUser({ ...user, image_profile: file }); // Aggiorna l'utente con il file
    }
  };

  return (
    <>
      <div className="block-signup flex justify-center items-center w-full bg-gray-100 h-screen">
        <div className="flex w-full h-full max-md:flex-col">
          {/* Section Bannière */}
          <div className="banner-register flex justify-center items-center w-2/5 max-md:w-full max-md:h-60">
            <div className="flex flex-col items-center text-center mt-80 max-md:mt-10">
              <h2 className="text-white font-bold tracking-wider text-xl max-md:text-lg">
                Déjà Membre Sportify
              </h2>
              <NavLink to={"/sign-in"}>
                <button className="text-white bg-black w-36 h-10 rounded opacity-50 mt-5">
                  Se Connecter
                </button>
              </NavLink>
            </div>
          </div>
          {/* Section Formulaire */}
          <div className="flex flex-col justify-center items-center w-2/3 max-md:w-full p-5">
            {/* Logo */}
            <div className="flex justify-center w-full mb-5">
              <NavLink to={"/"}>
                <img
                  className="w-72 max-md:w-48"
                  src="src/assets/images/logoSportifyOrangetVert.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            {/* Formulaire */}
            <div className="flex flex-col justify-center gap-5 w-1/3 max-md:w-full">
              <h2 className="font-medium text-center text-xl max-md:text-lg">
                Créer mon compte
              </h2>
              <form
                onSubmit={(e) => register(e)}
                className="flex flex-col gap-5"
                encType="multipart/form-data"
              >
                {/* Avatar Upload */}
                <div className="flex items-center justify-center">
                  <label htmlFor="image_profile" className="cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="src/assets/images/user.png"
                          alt="image user"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    id="image_profile"
                    type="file"
                    name="image_profile"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {errorMex ? errorMex : null}
                </div>
                {/* Inputs */}
                <div>
                  <label htmlFor="">USERNAME</label>
                  <input
                    className="input-text bg-white w-full max-md:w-[90vw]"
                    type="text"
                    name="name"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Entrez votre username"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">EMAIL</label>
                  <input
                    className="input-text bg-white w-full max-md:w-[90vw]"
                    type="email"
                    name="email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Entrez votre mail"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">MOT DE PASS</label>
                  <input
                    className="input-text bg-white w-full max-md:w-[90vw]"
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Entrez votre mot de pass"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">CONFIRMATION MOT DE PASS</label>
                  <input
                    className="input-text bg-white w-full max-md:w-[90vw]"
                    type="password"
                    name="password_confirmation"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        password_confirmation: e.target.value,
                      })
                    }
                    placeholder="Entrez votre mot de pass"
                    required
                  />
                </div>
                <button type="submit" className="btn-2 w-full max-md:w-[90vw]">
                  Créer mon compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
