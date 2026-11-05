import { useEffect, useRef, useState } from "react";
import { API_URL, getPronunciation } from "../services/wordService";
import "./Pronunciation.css";

let stopActivePlayback = null;

const WordAudio = ({ audioData, word, wordIndex }) => {
  const audioRef = useRef(null);
  const cleanupRef = useRef(null);
  const requestRef = useRef(0);
  const mountedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      requestRef.current += 1;

      if (cleanupRef.current) {
        cleanupRef.current();
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playWord = async () => {
    const requestId = ++requestRef.current;

    if (stopActivePlayback) {
      stopActivePlayback();
    }

    const item = audioData?.words?.[wordIndex];
    const audioUrl = audioData?.audioUrl;

    if (!audioUrl || !item) {
      setError("Trecho de áudio não encontrado nos dados do capítulo.");
      return;
    }

    const { start, end } = item;

    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      start < 0 ||
      end <= start
    ) {
      setError("Os tempos de áudio desta palavra são inválidos.");
      return;
    }

    setError("");

    let absoluteUrl;

    try {
      absoluteUrl = new URL(audioUrl, `${API_URL}/`).href;
    } catch {
      setError("A URL do áudio é inválida.");
      return;
    }

    let audio = audioRef.current;

    if (!audio || audio.src !== absoluteUrl) {
      if (audio) {
        audio.pause();
      }

      audio = new Audio(absoluteUrl);
      audio.preload = "auto";
      audioRef.current = audio;
    }

    audio.pause();

    let animationFrame = null;
    let cancelled = false;
    let cancelMetadataWait = null;

    const cleanup = () => {
      if (cancelled) return;

      cancelled = true;

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      if (cancelMetadataWait) {
        cancelMetadataWait();
        cancelMetadataWait = null;
      }

      audio.removeEventListener("timeupdate", checkEnd);
      audio.removeEventListener("ended", finish);
      audio.removeEventListener("error", handleAudioError);

      audio.pause();

      if (mountedRef.current) {
        setIsPlaying(false);
      }

      if (stopActivePlayback === cleanup) {
        stopActivePlayback = null;
      }

      if (cleanupRef.current === cleanup) {
        cleanupRef.current = null;
      }
    };

    const finish = () => {
      cleanup();
    };

    const checkEnd = () => {
      if (audio.currentTime >= end) {
        finish();
      }
    };

    const handleAudioError = () => {
      if (!cancelled && mountedRef.current) {
        setError("Não foi possível carregar ou reproduzir o áudio.");
      }

      cleanup();
    };

    cleanupRef.current = cleanup;
    stopActivePlayback = cleanup;

    audio.addEventListener("timeupdate", checkEnd);
    audio.addEventListener("ended", finish);
    audio.addEventListener("error", handleAudioError);

    try {
      if (audio.readyState < 1) {
        await new Promise((resolve, reject) => {
          const removeListeners = () => {
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("error", onError);
            cancelMetadataWait = null;
          };

          const onLoaded = () => {
            removeListeners();
            resolve();
          };

          const onError = () => {
            removeListeners();
            reject(new Error("Não foi possível carregar o áudio."));
          };

          cancelMetadataWait = () => {
            removeListeners();
            reject(new Error("Reprodução cancelada."));
          };

          audio.addEventListener("loadedmetadata", onLoaded, {
            once: true,
          });
          audio.addEventListener("error", onError, {
            once: true,
          });

          if (cancelled || requestId !== requestRef.current) {
            cancelMetadataWait();
          }
        });
      }

      if (cancelled || requestId !== requestRef.current) {
        cleanup();
        return;
      }

      if (!Number.isFinite(audio.duration) || end > audio.duration) {
        throw new Error("O tempo final ultrapassa a duração do áudio.");
      }

      audio.currentTime = start;

      await audio.play();

      if (cancelled || requestId !== requestRef.current) {
        cleanup();
        return;
      }

      setIsPlaying(true);

      const monitorPlayback = () => {
        if (cancelled) return;

        if (audio.currentTime >= end || audio.ended) {
          finish();
          return;
        }

        animationFrame = requestAnimationFrame(monitorPlayback);
      };

      animationFrame = requestAnimationFrame(monitorPlayback);
    } catch (err) {
      cleanup();

      if (
        mountedRef.current &&
        requestId === requestRef.current &&
        err.message !== "Reprodução cancelada."
      ) {
        setError(err.message || "Não foi possível reproduzir a palavra.");
      }
    }
  };

  return (
    <div
      className={`word-audio-box ${isPlaying ? "word-audio-box--playing" : ""}`}
    >
      <button
        type="button"
        className={`word-audio ${isPlaying ? "word-audio--playing" : ""}`}
        onClick={playWord}
        aria-label={`Ouvir a pronúncia de ${word}`}
        title={`Ouvir a pronúncia de ${word}`}
      >
        <svg
          className="word-audio__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      </button>

      <div className="word-audio__body">
        <p className="pronunciation-word">{word}</p>

        <span className="word-audio__wave" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>

      {error && (
        <span className="word-audio__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

const PronunciationExercise = ({ chapter }) => {
  const [loaded, setLoaded] = useState({
    data: null,
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    getPronunciation(chapter)
      .then((data) => {
        if (cancelled) return;

        const words = Array.isArray(data)
          ? data
          : Array.isArray(data?.pronunciationWords)
            ? data.pronunciationWords
            : [];

        setLoaded({
          data: {
            ...(Array.isArray(data) ? {} : data),
            words,
          },
          error: "",
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLoaded({
            data: null,
            error: "Não foi possível carregar os dados de áudio.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  const words = Array.isArray(loaded.data?.words) ? loaded.data.words : [];

  return (
    <div className="pronunciation-container">
      <h1 className="pronunciation-title">Pronunciation</h1>

      <p className="pronunciation-text">
        Just as every country has its own culture, accents also vary from
        country to country. Even within the same country, people from different
        regions may speak with different accents. Let's listen and get more
        familiar with Aarav's accent!
      </p>

      {loaded.error && (
        <span className="word-audio__error" role="alert">
          {loaded.error}
        </span>
      )}

      <div className="pronunciation-box">
        {words.map((item, index) => (
          <WordAudio
            key={`${item.word}-${index}`}
            audioData={loaded.data}
            word={item.word}
            wordIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

const Pronunciation = ({ chapter }) => {
  return <PronunciationExercise key={chapter} chapter={chapter} />;
};

export default Pronunciation;
