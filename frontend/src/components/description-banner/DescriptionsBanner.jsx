const DescriptionBanner = () => {
  return (
    <>
      <div className="general-block">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-5/6 gap-3">
            <div className="shadow-custom w-1/3 flex flex-col border rounded-md justify-center items-center text-center p-10 bg-white">
              <img
                className="w-28"
                src="src/assets/images/calendar.png"
                alt="logo"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur soluta doloremque .
              </p>
            </div>
            <div className="shadow-custom w-1/3  flex flex-col border rounded-md justify-center items-center text-center p-10 bg-white">
              <img
                className="w-28"
                src="src/assets/images/team.png"
                alt="logo"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur soluta doloremque .
              </p>
            </div>
            <div className="shadow-custom w-1/3 flex flex-col border rounded-md justify-center items-center text-center p-10 bg-white">
              <img
                className="w-28"
                src="src/assets/images/gym.png"
                alt="logo"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur soluta doloremque .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DescriptionBanner;
