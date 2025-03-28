import { useState, useEffect } from "react";
import Words from "./Words";
import Result from "./Result";
import { socket } from "./socket.js";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const Match = ({ matchId }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [advCursorIndex, setAdvCursorIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [words, setWords] = useState([]);
  const [status, setStatus] = useState("MATCH");

  useEffect(() => {
    const getWords = async () => {
      const res = await fetch("/words");
      const words = await res.json();
      setWords(words.words.slice(0, 40));
    };

    getWords();
  }, []);

  useEffect(() => {
    socket.on("advCursorIndex", (ind) => {
      setAdvCursorIndex(ind);
      return;
    });

    socket.on("winner", (id) => {
      console.log("game is finished");
      if (id === socket.id) {
        setStatus("WINNER");
        return;
      }
      setStatus("LOSER");
      return;
    });
  }, []);

  useEffect(() => {
    const handleTyping = (event) => {
      if (event.key === "Backspace") {
        if (typedWord !== "") {
          setTypedWord((old) => old.slice(0, -1));
        }
        return;
      }

      if (event.key === " ") {
        const isCorrect = typedWord === words[currentWordIndex];
        if (isCorrect) {
          if (currentWordIndex === words.length - 1) {
            console.log("finished");
            socket.emit("finished", matchId); // add timestamp?
          }
          setCurrentWordIndex((old) => old + 1);
          setTypedWord("");
          socket.emit("cursorIndex", matchId, currentWordIndex + 1);
        }
        return;
      }

      if (ALPHABET.includes(event.key)) {
        setTypedWord((old) => old + event.key);
      }
    };

    window.addEventListener("keydown", handleTyping);

    return () => window.removeEventListener("keydown", handleTyping);
  }, [typedWord]);

  if (status === "MATCH") {
    return (
      <Words
        words={words}
        currentWordIndex={currentWordIndex}
        typedWord={typedWord}
        advCursorIndex={advCursorIndex}
      />
    );
  }

  return <Result status={status} />;
};

export default Match;
