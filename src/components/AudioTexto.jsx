import { useEffect, useRef, useState } from "react";

export default function AudioTexto() {
  const audioRef = useRef(null);
  const [words, setWords] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("/audio/timestamps.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar JSON");
        return res.json();
      })
      .then((data) => setWords(data.words))
      .catch(console.error);
  }, []);

  function updateTime() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  return (
    <div className="audio-texto">
      <audio
        ref={audioRef}
        src="/audio/aarav.mp3"
        controls
        onTimeUpdate={updateTime}
      />

      <p className="texto-sincronizado">
        {words.map((word, index) => {
          const isActive =
            word.text.trim() !== "" &&
            currentTime >= word.start &&
            currentTime < word.end;

          return (
            <span
              key={index}
              className={isActive ? "palavra-ativa" : ""}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {word.text}
            </span>
          );
        })}
      </p>
    </div>
  );
}
