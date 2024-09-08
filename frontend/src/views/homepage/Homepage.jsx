import BannerTop from "../../components/top-banner/BannerTop";
import DescriptionBanner from "../../components/description-banner/DescriptionsBanner";
import Header from "../../components/header/Header";
import LastEvents from "../../components/last-events/LastEvents";
import CreateEventBanner from "../../components/create-event-banner/CreateEventBanner";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col ">
        <Header />
        <BannerTop />
        <DescriptionBanner />
        <LastEvents />
        <CreateEventBanner />
      </div>
      <div className="mb-40"></div>
    </>
  );
};
export default Homepage;
