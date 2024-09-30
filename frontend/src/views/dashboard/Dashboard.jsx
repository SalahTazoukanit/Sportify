// import AddEventButton from "../../components/add-event-button/AddEventButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MyEvents from "../../components/my-events/MyEvents";
import MyParticipatedEvents from "../../components/my-participated-events/MyParticipatedEvents";
import "./Dashboard.css";
import SettingUser from "../../components/setting-user/SettingUser";
import { NavLink } from "react-router-dom";
import SideBarSetting from "../../components/side-bar-setting/SideBarSetting";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="general-block flex">
        <div className="pl-20">
          <SideBarSetting />
        </div>
        <SettingUser />
      </div>
      <MyEvents />
      <MyParticipatedEvents />
      <Footer />
    </>
  );
};
export default Dashboard;
