import { useState, useEffect } from 'react';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const words = [ "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line", ];


const Words = ({ size }) => {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  
  useEffect(() => {

    const handleTyping = (event) => {
      if (event.key === 'Backspace') {
        if (currentWord !== '') {
          setCurrentWord(old => old.slice(0, -1));
        }
        return;
      }

      if (event.key === ' ') {
        const isCorrect = currentWord === words[currentWordIndex];
        if (isCorrect) {
          setCurrentWordIndex(old => old + 1);
          setCurrentWord('');
        }
        return;
      }

      if (ALPHABET.includes(event.key)) {
        setCurrentWord(old => old + event.key);
      };
    };

    window.addEventListener('keydown', handleTyping);

    return () => window.removeEventListener('keydown', handleTyping);

  }, [currentWord]);


  // TODO: Do an actual API call to fetch the words
  //
  //const words = getWords();

  const wordsToDisplay = []

  for (let i = 0; i < size; i++) {
    const word = words[i];
    if (i < currentWordIndex) {
      wordsToDisplay.push(
            <div key={i.toString()} className="word">
              {
                word.split("").map((letter, j) => (
                  <span className="letter right" key={i.toString() + "-" + j.toString()}>{letter}</span>
                ))
              }
            </div>
      );
      continue;
    }
    if (i === currentWordIndex) {
      const letters = [];
      let j = 0;
      let jj = 0;
      let cursorPlaced = false;
      if (currentWord !== '') {
        let wrong = false;
        while (j < currentWord.length) {
          const letter = currentWord[j];
          if (wrong) {
            letters.push(
                  <span className="letter wrong" key={i.toString() + "-" + j.toString()}>{letter}</span>
            );
          } else {
            if (currentWord[j] !== word[j]) {
              wrong = true;
              letters.push(
                    <span className="letter wrong" key={i.toString() + "-" + j.toString()}>{letter}</span>
              );
            } else {
              letters.push(
                    <span className="letter right" key={i.toString() + "-" + j.toString()}>{letter}</span>
              );
              jj++;
            }
          }
          j++;
          if (j === currentWord.length) {
            letters.push(<div key="curs" className="curs"></div>)
            cursorPlaced = true;
          }
        }
      }
      while (jj < word.length) {
        if (currentWord === '' && !cursorPlaced) {
          letters.push(<div key="curs" className="curs"></div>);
          cursorPlaced = true;
        };
        const letter = word[jj];
        letters.push(
            <span className="letter" key={i.toString() + "-" + (j+jj).toString()}>{letter}</span>
        );
        jj++;
      }
      wordsToDisplay.push(
        <div key={i.toString()} className="word flex items-center">
          {letters}
        </div>
      );
      continue;
    }
    wordsToDisplay.push(
          <div key={i.toString()} className="word flex items-center">
            {
              word.split("").map((letter, j) => (
                <span className="letter" key={i.toString() + "-" + j.toString()}>{letter}</span>
              ))
            }
          </div>
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
