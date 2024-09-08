const Event = () => {
  return (
    <>
      <div className="boxShadow shadow-custom rounded flex flex-wrap justify-center p-1 md:p-6 ">
        <div className="flex flex-col md:w-full justify-center ">
          <div className="flex justify-center items-center mb-1">
            <img
              className="md:w-full md:h-56 rounded w-2/3"
              src="src/assets/images/Football.jpg"
              alt="image événement"
            />
          </div>
          <div>
            <h3 className="font-bold">Titre</h3>
            <p className="text-third-color opacity-65">
              Lorem ipsum dolor sit amet.
            </p>
            <p className="text-third-color opacity-65">Date</p>
            <div className="flex gap-5 md:justify-between">
              <p className="text-third-color opacity-65">Places disponibles</p>
              {/* <button className="md:border md:p-1 md:rounded bg-second-color md:text-white">
                Participer
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
