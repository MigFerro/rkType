import JoinMatch from "./JoinMatch";

const Message = ({ status }) => {
  if (status == "WINNER") {
    return (
      <h2 className="text-center px-7 py-2.5 w-fit bg-blue-300 rounded-xl font-bold">
        Victory!
      </h2>
    );
  }

  if (status == "LOSER") {
    return (
      <h2 className="text-center px-7 py-2.5 w-fit bg-red-300 rounded-xl font-bold">
        Defeat
      </h2>
    );
  }
};

const MatchStats = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl px-10 py-8 rounded-xl flex justify-center items-center gap-20 mt-20 bg-gray-100 relative">
        <div className="absolute top-0 left-0 p-2 rounded-lg bg-slate-200 text-blue-400">
          You
        </div>
        <div className="absolute top-0 right-0 p-2 rounded-lg bg-slate-200 text-red-400">
          Opp
        </div>
        <div className="flex-col justify-center">
          <h2 className="text-center">
            WPM: <span className="text-blue-400 font-bold">124</span>
          </h2>
          <h2 className="text-center">
            Accuracy: <span className="text-blue-400 font-bold">98%</span>
          </h2>
        </div>
        <div className="inline-block h-20 min-h-[1em] w-0.5 self-stretch bg-gray-400"></div>
        <div className="flex-col justify-center">
          <h2 className="text-center">
            WPM: <span className="text-red-400 font-bold">117</span>
          </h2>
          <h2 className="text-center">
            Accuracy: <span className="text-red-400 font-bold">87%</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

const Result = ({ status }) => {
  return (
    <div>
      <div className="flex justify-center">
        <Message status={status} />
      </div>
      <MatchStats status={status} />
      <JoinMatch />
    </div>
  );
};

export default Result;
