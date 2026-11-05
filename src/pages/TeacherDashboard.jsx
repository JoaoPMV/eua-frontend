import { useState } from "react";

const WordExercises = () => {
  const [words] = useState([]);
  const [answers, setAnswers] = useState({});

  const handleLetterChange = (wordIndex, letterIndex, value) => {
    setAnswers((previous) => ({
      ...previous,
      [wordIndex]: {
        ...previous[wordIndex],
        [letterIndex]: value.slice(-1),
      },
    }));
  };

  return (
    <section className="exercises-container">
      <div className="word-row">
        {words.map((word, index) => {
          const wordAnswers = answers[index] || {};

          const isWordCorrect = word
            .split("")
            .every(
              (letter, letterIndex) =>
                (wordAnswers[letterIndex] || "").toLowerCase() ===
                letter.toLowerCase(),
            );

          return (
            <div className="word-exercise" key={`${word}-${index}`}>
              <span className="exercise-number">{index + 1}.</span>

              {word.split("").map((letter, letterIndex) => {
                const answer = wordAnswers[letterIndex] || "";
                const isCorrect =
                  answer !== "" &&
                  answer.toLowerCase() === letter.toLowerCase();

                return (
                  <input
                    key={letterIndex}
                    className={`letter-input ${isCorrect ? "correct" : ""}`}
                    type="text"
                    maxLength={1}
                    value={answer}
                    onChange={(event) =>
                      handleLetterChange(index, letterIndex, event.target.value)
                    }
                    aria-label={`Letra ${letterIndex + 1} da palavra ${index + 1}`}
                  />
                );
              })}

              {isWordCorrect && (
                <span className="word-feedback" aria-label="Resposta correta">
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WordExercises;
