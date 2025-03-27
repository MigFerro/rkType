import { useState, useEffect } from "react";
import Words from "./Words";
import { socket } from "./socket.js";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const Match = ({ matchId }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [advCursorIndex, setAdvCursorIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [words, setWords] = useState([]);

  useEffect(() => {
    const getWords = async () => {
      const res = await fetch("/words");
      const words = await res.json();
      setWords(words.words.slice(0, 50));
    };

    getWords();
  }, []);

  useEffect(() => {
    socket.on("advCursorIndex", (ind) => {
      setAdvCursorIndex(ind);
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

  return (
    <Words
      words={words}
      currentWordIndex={currentWordIndex}
      typedWord={typedWord}
      advCursorIndex={advCursorIndex}
    />
  );
};

export default Match;
