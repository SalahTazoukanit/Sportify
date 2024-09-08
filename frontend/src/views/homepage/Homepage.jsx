import BannerTop from "../../components/top-banner/BannerTop";
import DescriptionBanner from "../../components/description-banner/DescriptionsBanner";
import Header from "../../components/header/Header";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <BannerTop />
        <DescriptionBanner />
      </div>
    </>
  );
};
export default Homepage;
