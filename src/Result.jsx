import JoinMatch from "./JoinMatch";

const Winner = () => {
  return <h1 className="text-center">You won!</h1>;
};

const Loser = () => {
  return <h1 className="text-center">You lost...</h1>;
};

const Message = ({ status }) => {
  if (status === "WINNER") {
    return <Winner />;
  }
  if (status === "LOSER") {
    return <Loser />;
  }
};

const Result = ({ status }) => {
  return (
    <div>
      <Message status={status} />
      <JoinMatch />
    </div>
  );
};

export default Result;
