import { useState } from "react";

const SettingUser = () => {
  const [user, setUser] = useState("");
  return (
    <>
      <div className="flex border rounded bg-white w-3/4 p-20 items-center gap-20">
        <div className="flex flex-col w-1/2 gap-5">
          <h2 className="font-medium ">Configuration</h2>
          <div className="hidden md:block border"></div>
          <div className="flex flex-col gap-1">
            <label htmlFor=""> Username</label>
            <input className="w-10/12 rounded border h-8" type="text" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor=""> Email</label>
            <input className="w-10/12 rounded border h-8" type="text" />
          </div>
          <div className="flex justify-center bg-second-color text-white p-1 border rounded-full border-second-color w-1/3 mt-5">
            <button>Sauvegarder</button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            {user.image ? (
              <img
                className="rounded-full border-black md:w-40 md:h-40 hidden md:block "
                src="/src/assets/images/user.png"
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
          <div>
            <div className="rounded-full border font-medium text-second-color border-second-color p-2">
              <button>Choisir Image</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingUser;
