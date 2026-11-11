import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { getPronunciation } from "../services/wordService";
import "./Listening.css";
import "./Pages.css";

const CharacterCard = ({ chapter, alt, background, mobileBackground }) => {
  const audioRef = useRef(null);
  const [data, setData] = useState({
    audioUrl: "",
    image: "",
    text: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getPronunciation(chapter)
      .then((result) => {
        if (cancelled) return;
        setData({
          audioUrl: result?.audio || "",
          image: result?.image || "",
          text: result?.speech || "",
        });
      })
      .catch((error) => {
        if (!cancelled) console.error("Erro ao buscar os dados:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio || !data.audioUrl) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // background e mobileBackground recebem o valor CSS completo,
  // por exemplo: "url('/images/india.jpeg')"
  const style = {};

  if (background) style["--image-bg"] = background;

  // Sem imagem mobile, o CSS reaproveita a imagem desktop
  if (mobileBackground) style["--image-bg-mobile"] = mobileBackground;

  return (
    <div className="page-container" style={style}>
      <h1 className="page-title">Listening</h1>
      <p className="page-description">
        Do you remember about Ethan? Let's learn about his family: his parents
        and his sisters. His mother lives in the USA and hist father lives in
        Frace. Ethan moved to Norway some years ago. He talks to his family
        frequently.
      </p>
      {data.image && (
        <img className="background-image" src={data.image} alt={alt} />
      )}

      <div className="speech-bubble">
        <p>{data.text}</p>

        <audio
          ref={audioRef}
          src={data.audioUrl || undefined}
          onEnded={() => setIsPlaying(false)}
        />

        <button
          className="audio-button"
          onClick={toggleAudio}
          disabled={!data.audioUrl}
          aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
          title={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
        >
          {isPlaying ? (
            <Pause className="audio-icon" />
          ) : (
            <Play className="audio-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
