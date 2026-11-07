import { useEffect, useState, useRef } from "react";
import { getPronunciation } from "../services/wordService";

import "./Vocabulary.css";

const VocabularyExercise = ({ chapter, background, mobileBackground }) => {
  const [words, setWords] = useState([]);
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState({});
  const inputRefs = useRef({});

  const handleChange = (wordIndex, letterIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [wordIndex]: {
        ...prev[wordIndex],
        [letterIndex]: value.slice(-1).toUpperCase(),
      },
    }));
  };

  useEffect(() => {
    let cancelled = false;

    getPronunciation(chapter)
      .then((data) => {
        if (cancelled) return;
        setWords(
          Array.isArray(data?.vocabularyWords) ? data.vocabularyWords : [],
        );
        setDescription(data?.vocabularyDescription || "");
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Erro ao buscar palavras:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  const getNextInput = (wordIndex, letterIndex) => {
    const word = words[wordIndex];
    if (!word) return null;

    for (let i = letterIndex + 1; i < word.length; i++) {
      if (word[i] === "-") continue;

      const input = inputRefs.current[`${wordIndex}-${i}`];

      if (input && !input.readOnly) return input;
    }

    return null;
  };

  const getPreviousInput = (wordIndex, letterIndex) => {
    const word = words[wordIndex];
    if (!word) return null;

    for (let i = letterIndex - 1; i >= 0; i--) {
      if (word[i] === "-") continue;

      const input = inputRefs.current[`${wordIndex}-${i}`];

      if (input && !input.readOnly) {
        return { input, index: i };
      }
    }

    return null;
  };

  // background e mobileBackground recebem o valor CSS completo,
  // por exemplo: "url('/images/india.jpeg')"
  const style = {};

  if (background) style["--vocabulary-bg"] = background;

  // Sem imagem mobile, o CSS reaproveita a imagem desktop
  if (mobileBackground) style["--vocabulary-bg-mobile"] = mobileBackground;

  return (
    <div className="vocabulary-container" style={style}>
      <h1 className="vocabulary-title">Vocabulary</h1>
      <p className="vocabulary-paragraph">{description}</p>
      <div className="words-list">
        {words.map((word, wordIndex) => (
          <div className="words-box" key={`${word}-${wordIndex}`}>
            <div className="words">
              <div className="word">
                {word.split("").map((letter, letterIndex) => {
                  if (letter === "-") {
                    return (
                      <span key={letterIndex} className="word-hyphen">
                        -
                      </span>
                    );
                  }

                  const answer = answers[wordIndex]?.[letterIndex] || "";

                  const isCorrect =
                    answer !== "" &&
                    answer.toLowerCase() === letter.toLowerCase();

                  return (
                    <input
                      key={letterIndex}
                      ref={(el) => {
                        inputRefs.current[`${wordIndex}-${letterIndex}`] = el;
                      }}
                      type="text"
                      inputMode="text"
                      maxLength={1}
                      value={answer}
                      readOnly={isCorrect}
                      autoCapitalize="characters"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      aria-label={`Letter ${letterIndex + 1} of word ${wordIndex + 1}`}
                      style={{ textTransform: "uppercase" }}
                      className={`letter-input ${isCorrect ? "correct" : ""}`}
                      onChange={(event) => {
                        const value = event.target.value;

                        handleChange(wordIndex, letterIndex, value);

                        if (value) {
                          const nextInput = getNextInput(
                            wordIndex,
                            letterIndex,
                          );

                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Backspace") return;

                        if (answer && !isCorrect) {
                          handleChange(wordIndex, letterIndex, "");
                          return;
                        }

                        if (!answer) {
                          const previous = getPreviousInput(
                            wordIndex,
                            letterIndex,
                          );

                          if (previous) {
                            event.preventDefault();
                            previous.input.focus();

                            handleChange(wordIndex, previous.index, "");
                          }
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Vocabulary = ({ chapter, background, mobileBackground }) => {
  return (
    <VocabularyExercise
      key={chapter}
      chapter={chapter}
      background={background}
      mobileBackground={mobileBackground}
    />
  );
};

export default Vocabulary;
