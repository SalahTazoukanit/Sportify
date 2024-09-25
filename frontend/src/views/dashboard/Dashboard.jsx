import { useState } from "react";
import AddEventButton from "../../components/add-event-button/AddEventButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MyEvents from "../../components/my-events/MyEvents";
import MyParticipatedEvents from "../../components/my-participated-events/MyParticipatedEvents";
import "./Dashboard.css";
import SettingUser from "../../components/setting-user/SettingUser";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className=" p-5">
        <AddEventButton />
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-1/4 ml-10">
          <h3>Configuration</h3>
          <h3>Mes Favoris</h3>
          <div>Regalges</div>
          <div>myEvents</div>
          <div>myPartecipatedEvents</div>
        </div>
        <div className="flex flex-col w-3/4 mr-10">
          <div className="flex flex-col gap-10">
            <SettingUser />

            <div>myEvents</div>
            <div>myPartecipatedEvents</div>
          </div>
        </div>
      </div>
      {/* <div className="general-block flex justify-center items-center ">
        <div className="flex justify-center items-center md:w-2/3 border bg-white rounded md:h-72 p-5 md:gap-5">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col  gap-1 ml-5">
                <label htmlFor="">Username</label>
                <input
                  className="input-text border"
                  type="text"
                  name=""
                  id=""
                  placeholder="ciao"
                />
              </div>
              <div className="flex flex-col  gap-1 ml-5">
                <label htmlFor="">Email</label>
                <input
                  className="input-text border"
                  type="email"
                  name=""
                  id=""
                  placeholder="ciao"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <img
              className="rounded-full border-black w-52 hidden md:block"
              src="/src/assets/images/why-sportify.png"
              alt=""
            />
            <button className="border-second-color border p-1 rounded-full text-xs hidden md:block text-second-color">
              Choisir image
            </button>
          </div>
        </div>
      </div> */}
      <MyEvents />
      <MyParticipatedEvents />
      <Footer />
    </>
  );
};
export default Dashboard;
