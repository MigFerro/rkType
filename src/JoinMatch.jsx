import { useState, useEffect } from "react";

import Match from "./Match";
import { socket } from "./socket";
import { Navigate } from "react-router";

const JoinMatch = () => {
  const [join, setJoin] = useState(false);
  const [status, setStatus] = useState("HOME");
  const [matchId, setMatchId] = useState("");

  useEffect(() => {
    if (!join) return;

    socket.on("connection", () => {
      console.log("Connected to server");
    });

    socket.on("waitingForMatch", () => {
      setStatus("WAITING");
    });

    socket.on("matchCreated", (matchId) => {
      setStatus("MATCH");
      setMatchId(matchId);
    });
  }, [join]);

  const handleClick = () => {
    if (!join) {
      setJoin(true);
      socket.emit("lookingForMatch", "join");
    }
  };

  if (status === "MATCH") {
    //return <Match matchId={matchId} />;
    return <Navigate to={"/match/" + matchId} />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center mt-5">
      <div className="my-10">
        {status === "WAITING" ? "Searching for an opponent..." : ""}
      </div>
      <button className={join && "disabled"} onClick={handleClick}>
        Join Match
      </button>
    </div>
  );
};

export default JoinMatch;
