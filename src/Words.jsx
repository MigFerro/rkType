const Words = ({ words, currentWordIndex, typedWord, advCursorIndex }) => {
  const wordsToDisplay = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (i < currentWordIndex) {
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
    if (i === currentWordIndex) {
      const letters = [];
      let j = 0;
      //let jj = 0;
      let cursorPlaced = false;
      if (typedWord !== "") {
        let wrong = false;
        while (j < typedWord.length) {
          const letter = j < word.length ? word[j] : typedWord[j];
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
            if (typedWord[j] !== word[j]) {
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
            }
          }
          j++;
          if (j === typedWord.length) {
            letters.push(<div key="curs" className="curs"></div>);
            cursorPlaced = true;
          }
        }
      }
      while (j < word.length) {
        if (typedWord === "" && !cursorPlaced) {
          letters.push(<div key="curs" className="curs"></div>);
          cursorPlaced = true;
        }
        const letter = word[j];
        letters.push(
          <span className="letter" key={i.toString() + "-" + j.toString()}>
            {letter}
          </span>,
        );
        j++;
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
        {i === advCursorIndex ? (
          <div key="curs-adv" className="curs adv"></div>
        ) : (
          ""
        )}
        {word.split("").map((letter, j) => (
          <span className="letter" key={i.toString() + "-" + j.toString()}>
            {letter}
          </span>
        ))}
      </div>,
    );
  }

  return (
    <div className="flex justify-center px-[10%]">
      <div className="wordsContainer flex flex-wrap justify-items-start space-x-4">
        {wordsToDisplay}
      </div>
    </div>
  );
};

export default Words;
