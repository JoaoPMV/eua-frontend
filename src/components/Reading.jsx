import { useEffect, useState } from "react";
import { getPronunciation } from "../services/wordService";
import "./Reading.css";

const ReadingContent = ({ chapter }) => {
  const [data, setData] = useState({ title: "", text: "" });

  useEffect(() => {
    let cancelled = false;

    getPronunciation(chapter)
      .then((result) => {
        if (cancelled) return;
        setData({
          title: result?.readingDescription || "",
          text: result?.readingIntroduction || "",
        });
      })
      .catch((error) => {
        if (!cancelled) console.error("Erro ao buscar a leitura:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  return (
    <section className="reading-section">
      <h1 className="reading-title">Reading</h1>

      <p className="reading-description">{data.title}</p>
    </section>
  );
};

const Reading = ({ chapter }) => {
  return <ReadingContent key={chapter} chapter={chapter} />;
};

export default Reading;
