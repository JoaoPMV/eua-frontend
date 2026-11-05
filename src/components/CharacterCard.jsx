import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { getPronunciation } from "../services/wordService";
import "./CharacterCard.css";

const CharacterCard = ({ chapter, alt }) => {
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
          audioUrl: result?.audioUrl || "",
          image: result?.image || "",
          text: result?.characterPresentation || "",
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

  return (
    <div className="image-container">
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
