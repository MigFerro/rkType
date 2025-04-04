import { useEffect, useRef, useState } from "react";

const Words = ({ words, currentWordIndex, typedWord }) => {
  const wordsToDisplay = [];
  const letterRefs = useRef({});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Set cursor position after render
  useEffect(() => {
    const letterKey = currentWordIndex - typedWord.length;
    const targetRef = letterRefs.current[letterKey];
    if (targetRef && targetRef.getBoundingClientRect) {
      const rect = targetRef.getBoundingClientRect();
      setCursorPos({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        height: rect.height,
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
    <div className="relative">
      <div className="flex justify-center px-[10%]">
        <div className="wordsContainer flex flex-wrap justify-items-start space-x-4">
          {wordsToDisplay}
        </div>
      </div>

      {/* Floating cursor */}
      <div
        className="curs absolute transition-all duration-75"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          height: `${cursorPos.height || 24}px`,
        }}
      ></div>
    </div>
  );
};

export default Words;
