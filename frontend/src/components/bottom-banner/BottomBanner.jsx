import "./BottomBanner.css";

const BottomBanner = () => {
  return (
    <>
      <div className="general-block ">
        <div className="flex flex-col md:flex-row md:gap-5 justify-center items-center md:w-full">
          <div className="md:w-1/5 ">
            <img
              className="rounded-lg "
              src="src/assets/images/footingTeam.jpg"
              alt=""
            />
            <p className="hidden md:block text-center">
              Unis par le sport, poussés par la passion
            </p>
          </div>
          <div className="md:w-2/5">
            <img
              className="rounded-lg "
              src="src/assets/images/footingTeamOld.jpg"
              alt=""
            />
            <p className="hidden md:block text-center">
              Le plaisir du sport, à tout âge
            </p>
          </div>
          <div className="md:w-1/5">
            <img
              className="rounded-lg "
              src="src/assets/images/leah-hetteberg-KkoBekO8JtU-unsplash.jpg"
              alt=""
            />
            <p className="hidden md:block text-center">
              L'effort collectif, la clé de la réussite
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BottomBanner;
