//const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const Words = ({ words, currentWordIndex, typedWord }) => {
  //const [currentWordIndex, setCurrentWordIndex] = useState(0);
  //const [currentWord, setCurrentWord] = useState("");
  //const [words, setWords] = useState([]);
  //
  //useEffect(() => {
  //  const getWords = async () => {
  //    const res = await fetch("/words");
  //    const words = await res.json();
  //    setWords(words.words);
  //  };
  //
  //  getWords();
  //}, []);
  //
  //useEffect(() => {
  //  const handleTyping = (event) => {
  //    if (event.key === "Backspace") {
  //      if (currentWord !== "") {
  //        setCurrentWord((old) => old.slice(0, -1));
  //      }
  //      return;
  //    }
  //
  //    if (event.key === " ") {
  //      const isCorrect = currentWord === words[currentWordIndex];
  //      if (isCorrect) {
  //        setCurrentWordIndex((old) => old + 1);
  //        setCurrentWord("");
  //      }
  //      return;
  //    }
  //
  //    if (ALPHABET.includes(event.key)) {
  //      setCurrentWord((old) => old + event.key);
  //    }
  //  };
  //
  //  window.addEventListener("keydown", handleTyping);
  //
  //  return () => window.removeEventListener("keydown", handleTyping);
  //}, [currentWord]);
  //

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
      let jj = 0;
      let cursorPlaced = false;
      if (typedWord !== "") {
        let wrong = false;
        while (j < typedWord.length) {
          const letter = typedWord[j];
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
              jj++;
            }
          }
          j++;
          if (j === typedWord.length) {
            letters.push(<div key="curs" className="curs"></div>);
            cursorPlaced = true;
          }
        }
      }
      while (jj < word.length) {
        if (typedWord === "" && !cursorPlaced) {
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

  return (
    <div className="flex justify-center px-[10%]">
      <div className="wordsContainer flex flex-wrap justify-items-start space-x-4">
        {wordsToDisplay}
      </div>
    </div>
  );
};

export default Words;
