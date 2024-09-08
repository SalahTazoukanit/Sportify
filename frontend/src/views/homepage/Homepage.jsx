import BannerTop from "../../components/top-banner/BannerTop";
import DescriptionBanner from "../../components/description-banner/DescriptionsBanner";
import Header from "../../components/header/Header";
import LastEvents from "../../components/last-events/LastEvents";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col ">
        <Header />
        <BannerTop />
        <DescriptionBanner />
        <LastEvents />
      </div>
      <div className="mb-40"></div>
    </>
  );
};
export default Homepage;
