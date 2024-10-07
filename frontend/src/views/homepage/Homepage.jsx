import BannerTop from "../../components/top-banner/BannerTop";
import DescriptionBanner from "../../components/description-banner/DescriptionsBanner";
import Header from "../../components/header/Header";
import LastEvents from "../../components/last-events/LastEvents";
import CreateEventBanner from "../../components/create-event-banner/CreateEventBanner";
import Sport from "../../components/sport-card/Sport";
import BottomBanner from "../../components/bottom-banner/BottomBanner";
import Footer from "../../components/footer/Footer";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col ">
        <Header />
        <BannerTop />
        <DescriptionBanner />
        <LastEvents />
        <CreateEventBanner />
        <Sport />
        <BottomBanner />
        <Footer />
      </div>
    </>
  );
};
export default Homepage;
