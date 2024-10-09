import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/users/login", user)
      .then((response) => {
        const token = response.data.token;
        const user_id = response.data.user_id;
        const user_role = response.data.user_role;

        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user_role", user_role);

        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(null);
        }, 3000);
      });
  };

  return (
    <>
      <div className="block-signin flex justify-center items-center w-full bg-gray-100 h-screen">
        <div className="flex w-full h-full max-md:flex-col max-md:items-center">
          <div className="flex flex-col justify-center items-center gap-10 w-2/3 max-md:w-full p-5">
            <div className="flex justify-center w-full">
              <NavLink to={"/"}>
                <img
                  className="w-72 max-md:w-48"
                  src="src/assets/images/logoSportifyOrangetVert.png"
                  alt="image logo"
                />
              </NavLink>
            </div>
            <div className="flex flex-col justify-center gap-5 w-1/3 max-md:w-full">
              <h2 className="font-medium text-center">Se Connecter</h2>
              <form onSubmit={(e) => login(e)} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="">EMAIL</label>
                  <input
                    className="input-text bg-white w-full max-md:w-[90vw]"
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
                    className="input-text bg-white w-full max-md:w-[90vw]"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de pass"
                    required
                  />
                </div>
                {isVisible && (
                  <div>
                    <p className="text-xs text-red-950">{error}</p>
                  </div>
                )}
                <button className="btn-2 w-full max-md:w-[90vw]">
                  Se Connecter
                </button>
              </form>
            </div>
          </div>
          <div className="banner-inscription flex justify-start items-center w-2/5 max-md:w-full max-md:h-60 p-5">
            <div className="flex flex-col text-center md:text-left max-sm:justify-center ">
              <h2 className="text-white font-bold text-2xl md:text-3xl">
                Bienvenue
              </h2>
              <NavLink to={"/sign-up"}>
                <button className="text-white bg-black w-36 h-10 rounded opacity-50 mt-5">
                  S'Enregistrer
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
