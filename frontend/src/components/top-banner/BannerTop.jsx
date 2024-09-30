import "./BannerTop.css";

const BannerTop = () => {
  return (
    <>
      <div className="general-block flex justify-center items-center">
        <div className="top-banner flex flex-col items-center w-11/12 rounded">
          <div className="flex flex-col justify-center items-center text-second-color text-center mt-10">
            <h1 className="banner-top-text tracking-wider">
              VOTRE RÉSEAU DE SPORTIFS <br />À PORTÉE DE MAIN
            </h1>
            <h2 className="banner-top-text tracking-wider hidden md:block">
              CONNECTEZ, JOUEZ, PROFITEZ
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerTop;
