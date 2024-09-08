import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        //get token form response and saved it in localStorage;
        const token = response.data.token;
        localStorage.setItem("token", token);
        //message
        alert(response.data.message);
        //redirect to dashboard if login successfully ;
        navigate("/dashboard");
      });
  };

  return (
    <>
      <div className="block-signin flex justify-center items-center w-full bg-gray-100">
        <div className="flex w-full h-full">
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
              <h2 className="font-medium">Se Connecter</h2>
              <form onSubmit={(e) => login(e)} className="flex flex-col gap-10">
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
                <button className="btn-2">Se Connecter</button>
              </form>
            </div>
          </div>
          <div className="banner-inscription flex justify-start items-center w-2/5">
            <div className="flex flex-col ml-10 ">
              <h2 className="text-white font-bold ">Bienvenue</h2>
              <NavLink to={"/sign-up"}>
                <button className="text-white bg-black w-36 h-10 rounded opacity-50">
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
