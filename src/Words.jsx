import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const MultiplayerWords = () => {
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const getWords = async () => {
      const res = await fetch("/words");
      const words = await res.json();
      setWords(words.words);
    };

    getWords();
  }, []);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io("ws://localhost:3001", {
      withCredentials: false,
      //extraHeaders: {
      //  "my-custom-header": "abcd",
      //},
    });
    setSocket(newSocket);

    // Handle connection and game events
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("gameState", (gameState) => {
      setPlayers(gameState.players);
    });

    newSocket.on("playerUpdate", (playerState) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => (p.id === playerState.id ? playerState : p)),
      );
    });

    newSocket.on("gameOver", (winnerId) => {
      const winner = players.find((p) => p.id === winnerId);
      alert(`Game Over! ${winner?.username || "Player"} wins!`);
      setGameStarted(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoinGame = () => {
    if (username.trim() && socket) {
      socket.emit("joinGame", { username });
    }
  };

  const handleStartGame = () => {
    if (socket) {
      socket.emit("startGame");
      setGameStarted(true);
    }
  };

  const handleTyping = (event) => {
    if (!currentPlayer || !socket) {
      console.log("no player");
      return;
    }

    console.log("has player", currentPlayer.id);

    const { currentWordIndex } = currentPlayer;

    if (event.key === "Backspace") {
      if (currentPlayer.currentWord !== "") {
        socket.emit("updatePlayerState", {
          ...currentPlayer,
          currentWord: currentPlayer.currentWord.slice(0, -1),
        });
      }
      return;
    }

    if (event.key === " ") {
      const currentWord = currentPlayer.currentWord;
      const expectedWord = words[currentWordIndex];

      if (currentWord === expectedWord) {
        socket.emit("updatePlayerState", {
          ...currentPlayer,
          currentWordIndex: currentWordIndex + 1,
          currentWord: "",
          isFinished: currentWordIndex + 1 >= words.length,
        });
      }
      return;
    }

    if (ALPHABET.includes(event.key.toLowerCase())) {
      socket.emit("updatePlayerState", {
        ...currentPlayer,
        currentWord: currentPlayer.currentWord + event.key.toLowerCase(),
      });
    }
  };

  const renderPlayerWords = (player) => {
    const wordsToDisplay = [];
    console.log("renderPlayerWords", words, player.currentWordIndex);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Logic for rendering words (similar to original component)
      if (i < player.currentWordIndex) {
        wordsToDisplay.push(
          <div key={i.toString()} className="word">
            {word.split("").map((letter, j) => (
              <span
                className="letter right"
                key={i.toString() + "-" + j.toString()}
              >
                {letter}
              </span>
            ))}
          </div>,
        );
        continue;
      }

      if (i === player.currentWordIndex) {
        const letters = [];
        let j = 0;
        let jj = 0;
        let cursorPlaced = false;

        if (player.currentWord !== "") {
          let wrong = false;
          while (j < player.currentWord.length) {
            const letter = player.currentWord[j];
            if (wrong) {
              letters.push(
                <span
                  className="letter wrong"
                  key={i.toString() + "-" + j.toString()}
                >
                  {letter}
                </span>,
              );
            } else {
              if (player.currentWord[j] !== word[j]) {
                wrong = true;
                letters.push(
                  <span
                    className="letter wrong"
                    key={i.toString() + "-" + j.toString()}
                  >
                    {letter}
                  </span>,
                );
              } else {
                letters.push(
                  <span
                    className="letter right"
                    key={i.toString() + "-" + j.toString()}
                  >
                    {letter}
                  </span>,
                );
                jj++;
              }
            }
            j++;
            if (j === player.currentWord.length) {
              letters.push(<div key="curs" className="curs"></div>);
              cursorPlaced = true;
            }
          }
        }

        while (jj < word.length) {
          if (player.currentWord === "" && !cursorPlaced) {
            letters.push(<div key="curs" className="curs"></div>);
            cursorPlaced = true;
          }
          const letter = word[jj];
          letters.push(
            <span
              className="letter"
              key={i.toString() + "-" + (j + jj).toString()}
            >
              {letter}
            </span>,
          );
          jj++;
        }

        wordsToDisplay.push(
          <div key={i.toString()} className="word flex items-center">
            {letters}
          </div>,
        );
        continue;
      }

      wordsToDisplay.push(
        <div key={i.toString()} className="word flex items-center">
          {word.split("").map((letter, j) => (
            <span className="letter" key={i.toString() + "-" + j.toString()}>
              {letter}
            </span>
          ))}
        </div>,
      );
    }

    return wordsToDisplay;
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <button
          onClick={handleJoinGame}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Join Game
        </button>
        {players.length > 1 && (
          <button
            onClick={handleStartGame}
            className="p-2 bg-green-500 text-white rounded"
          >
            Start Game
          </button>
        )}
        <div className="mt-4">
          Players:
          {players.map((player) => (
            <div key={player.id}>{player.username}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div tabIndex={0} onKeyDown={handleTyping} className="focus:outline-none">
      <div className="flex justify-between p-4">
        {players.map((player) => (
          <div key={player.id} className="w-1/2 p-2">
            <h2 className="text-xl font-bold">{player.username}</h2>
            <div className="flex justify-center px-[10%]">
              <div className="wordsContainer flex flex-wrap justify-items-start space-x-4">
                {renderPlayerWords(player)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiplayerWords;
