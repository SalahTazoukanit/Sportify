import AddEventButton from "../../components/add-event-button/AddEventButton";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="dashboard-banner flex items-center">
        <h1 className="text-orange-500 font-semibold m-5 md:ml-10 max-sm:text-4xl">
          Tableau de bord
        </h1>
      </div>
      <div className="general-block p-5">
        <AddEventButton />
      </div>

      {/* <div className="general-block flex justify-center items-center ">
        <div className="flex justify-center items-center md:w-1/2 border bg-white rounded md:h-72 p-5 md:gap-5">
          <div className="flex flex-col">
            <div className="border-b">
              <h2 className="font-semibold ml-5">Reglages de mon compte</h2>
            </div>
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
      <Footer />
    </>
  );
};
export default Dashboard;
