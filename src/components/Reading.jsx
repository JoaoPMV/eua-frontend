import { useEffect, useState } from "react";
import { getPronunciation } from "../services/wordService";
import "./Reading.css";

const ReadingContent = ({ chapter, background, mobileBackground }) => {
  const [data, setData] = useState({ reading: "", text: "" });

  useEffect(() => {
    let cancelled = false;

    getPronunciation(chapter)
      .then((result) => {
        if (cancelled) return;
        setData({
          reading: result?.reading || "",
          text: result?.readingIntro || "",
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

  if (background) style["--image-bg"] = background;

  // Sem imagem mobile, o CSS reaproveita a imagem desktop
  if (mobileBackground) style["--image-bg-mobile"] = mobileBackground;

  return (
    <section className="page-container" style={style}>
      <h1 className="page-title">Reading</h1>

      <p className="page-description">{data.reading}</p>
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
