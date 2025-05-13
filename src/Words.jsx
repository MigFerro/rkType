import { useEffect, useRef, useState } from "react";

const Words = ({ words, currentWordIndex, typedWord }) => {
  const wordsToDisplay = [];
  const letterRefs = useRef({});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, adv: false });

  // Set cursor position after render
  useEffect(() => {
    const letterKey = currentWordIndex - typedWord.length;
    const targetRef = letterRefs.current[letterKey];
    if (targetRef && targetRef.getBoundingClientRect) {
      const rect = targetRef.getBoundingClientRect();

      setCursorPos({
        x: rect.left + window.scrollX - 2,
        y: rect.top + window.scrollY,
        adv: true,
      });
    } else if (cursorPos.adv) {
      setCursorPos({
        x: cursorPos.x + 12,
        y: cursorPos.y,
        adv: false,
      });
    }
  }, [typedWord, currentWordIndex]);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const letters = [];

    for (let j = 0; j < word.length; j++) {
      const letterKey = i - j;
      const isTyped =
        i < currentWordIndex ||
        (i === currentWordIndex && j < typedWord.length);
      const isCorrect =
        i < currentWordIndex ||
        (i === currentWordIndex && typedWord[j] === word[j]);

      const className =
        isTyped && isCorrect
          ? "letter right"
          : isTyped && !isCorrect
            ? "letter wrong"
            : "letter";

      letters.push(
        <span
          className={className}
          key={letterKey}
          ref={(el) => {
            if (i === currentWordIndex) {
              letterRefs.current[letterKey] = el;
            }
          }}
        >
          {word[j]}
        </span>,
      );
    }

    wordsToDisplay.push(
      <div key={i.toString()} className="word flex items-center">
        {letters}
      </div>,
    );
  }

  return (
    <div className="">
      <div className="flex justify-center px-[10%]">
        <div className="wordsContainer flex flex-wrap justify-items-start space-x-4">
          {wordsToDisplay}
        </div>
      </div>

      <div
        className="curs absolute transition-all duration-75"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      ></div>
    </div>
  );
};

export default Words;
