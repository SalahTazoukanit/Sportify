import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const user = {
      name: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/users/register", user)
      .then((response) => {
        //message if register successfully ;
        alert(response.data.message);
        //redirect to sign-in page ;
        navigate("/sign-in");
      });
  };

  return (
    <>
      <div className="block-signup flex justify-center items-center w-full bg-gray-100">
        <div className="flex w-full h-full">
          {/* left banner  */}
          <div className="banner-register flex justify-center items-center w-2/5">
            <div className="flex flex-col items-center mt-80">
              <h2 className="text-white font-bold tracking-wider">
                Déja Membre Sportify
              </h2>
              <NavLink to={"/sign-in"}>
                <button className="text-white bg-black w-36 h-10 rounded opacity-50">
                  Se Connecter
                </button>
              </NavLink>
            </div>
          </div>
          {/* right side form register */}
          <div className="flex flex-col justify-center items-center gap-10 w-2/3">
            <div className="flex">
              <NavLink to={"/"}>
                <img
                  className="flex w-72"
                  src="src/assets/images/logoSportifyOrangetVert.png"
                  alt="image logo"
                />
              </NavLink>
            </div>
            <div className="flex flex-col justify-center gap-5 w-1/3">
              <h2 className="font-medium">Créer mon compte</h2>
              <form
                onSubmit={(e) => register(e)}
                className="flex flex-col gap-10"
              >
                <div>
                  <label htmlFor="">USERNAME</label>
                  <input
                    className="input-text bg-white"
                    type="text"
                    name="name"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre username"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">EMAIL</label>
                  <input
                    className="input-text bg-white"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre mail"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">MOT DE PASS</label>
                  <input
                    className="input-text bg-white"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de pass"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">CONFIRMATION MOT DE PASS</label>
                  <input
                    className="input-text"
                    type="password"
                    name="password_confirmation"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Entrez votre mot de pass"
                    required
                  />
                </div>
                <button type="submit" className="btn-2">
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
