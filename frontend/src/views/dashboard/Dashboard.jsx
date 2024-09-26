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
            {/* <div>myEvents</div>
            <div>myPartecipatedEvents</div> */}
          </div>
        </div>
      </div>
      <MyEvents />
      <MyParticipatedEvents />
      <Footer />
    </>
  );
};
export default Dashboard;
