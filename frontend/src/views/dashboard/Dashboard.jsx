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
      <AddEventButton />
      <SettingUser />
      <MyEvents />
      <MyParticipatedEvents />
      <Footer />
    </>
  );
};
export default Dashboard;
