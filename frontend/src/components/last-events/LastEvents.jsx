import Event from "../event-card/Event";
import SeeMoreButton from "../see-more-button/SeeMoreButton";

const LastEvents = () => {
  return (
    <>
      <div className="general-block flex flex-col items-center">
        <div className="flex flex-col justify-center w-5/6 ">
          <h2 className="text-start font-semibold ">
            Nos derniers événements disponibles
          </h2>
          <div className="general-block grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
          </div>
          <SeeMoreButton />
        </div>
      </div>
    </>
  );
};
export default LastEvents;
