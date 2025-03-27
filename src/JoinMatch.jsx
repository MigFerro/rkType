import { useState, useEffect } from "react";

import Match from "./Match";
import { socket } from "./socket";

const JoinMatch = () => {
  const [join, setJoin] = useState(false);
  const [status, setStatus] = useState("HOME");
  const [matchId, setMatchId] = useState("");

  useEffect(() => {
    if (!join) return;

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("inPool", () => {
      setStatus("WAITING");
    });

    socket.on("match", (matchId) => {
      setStatus("MATCH");
      setMatchId(matchId);
    });
  }, [join]);

  const handleClick = () => {
    if (!join) {
      setJoin(true);
      socket.emit("joinPool", "join");
    }
  };

  if (status === "MATCH") {
    return <Match matchId={matchId} />;
  }

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="flex flex-col justify-center">
        <div className="my-10">
          {status === "WAITING" ? "Waiting for another player..." : ""}
        </div>
        <button className={join ? "disabled" : ""} onClick={handleClick}>
          Join Match
        </button>
      </div>
    </div>
  );
};

export default JoinMatch;
