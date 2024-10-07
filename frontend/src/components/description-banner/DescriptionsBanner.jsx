const DescriptionBanner = () => {
  return (
    <>
      <div className="general-block">
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center items-center w-5/6 gap-3">
            <div className="shadow-custom md:w-1/3 flex flex-col border rounded-md justify-center items-center text-center p-10 bg-white">
              <img
                className="w-28 hidden md:block"
                src="src/assets/images/calendar.png"
                alt="logo"
              />
              <p>
                Créez vos propres événements sportifs en toute simplicité pour y
                participer.
              </p>
            </div>
            <div className="shadow-custom md:w-1/3  flex flex-col border rounded-md justify-center items-center text-center p-10 bg-white">
              <img
                className="w-28 hidden md:block"
                src="src/assets/images/team.png"
                alt="logo"
              />
              <p>
                Rejoignez des événements et connectez-vous avec d’autres
                passionnés de sport.
              </p>
            </div>
            <div className="shadow-custom md:w-1/3 flex flex-col border rounded-md justify-center items-center text-center p-10 bg-white">
              <img className="w-28 hidden md:block" src="gym.png" alt="logo" />
              <p>
                Participez à des activités régulières pour maintenir votre forme
                physique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DescriptionBanner;
