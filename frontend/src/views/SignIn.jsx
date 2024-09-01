import { NavLink } from "react-router-dom";

const SignIn = () => {
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
              <h2>Se Connecter</h2>
              <form className="flex flex-col gap-10">
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    className="input-text bg-white"
                    type="text"
                    name=""
                    id=""
                    placeholder="Entrez votre mail"
                  />
                </div>
                <div>
                  <label htmlFor="">Mots de passe</label>
                  <input
                    className="input-text"
                    type="password"
                    name=""
                    id=""
                    placeholder="Entrez le mots de passe"
                  />
                </div>
                <button className="btn-2">Se Connecter</button>
              </form>
            </div>
          </div>
          <div className="banner-inscription flex justify-start items-center w-2/5">
            <div className="flex flex-col ml-10 ">
              <h2 className="">Bienvenue</h2>
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
