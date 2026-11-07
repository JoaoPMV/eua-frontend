import { useEffect, useState } from "react";
import { getPronunciation } from "../services/wordService";
import "./Reading.css";

const ReadingContent = ({ chapter, background, mobileBackground }) => {
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

  // background e mobileBackground recebem o valor CSS completo,
  // por exemplo: "url('/images/india.jpeg')"
  const style = {};

  if (background) style["--reading-bg"] = background;

  // Sem imagem mobile, o CSS reaproveita a imagem desktop
  if (mobileBackground) style["--reading-bg-mobile"] = mobileBackground;

  return (
    <section className="reading-section" style={style}>
      <h1 className="reading-title">Reading</h1>

      <p className="reading-description">{data.title}</p>
    </section>
  );
};

const Reading = ({ chapter, background, mobileBackground }) => {
  return (
    <ReadingContent
      key={chapter}
      chapter={chapter}
      background={background}
      mobileBackground={mobileBackground}
    />
  );
};

export default Reading;
