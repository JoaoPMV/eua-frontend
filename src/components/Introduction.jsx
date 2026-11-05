import { useEffect, useState } from "react";
import { getPronunciation } from "../services/wordService";
import "./Introduction.css";

const ONES = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const numberToWords = (n) => {
  if (n < 20) return ONES[n];

  const tens = Math.floor(n / 10);
  const ones = n % 10;

  return ones ? `${TENS[tens]}-${ONES[ones]}` : TENS[tens];
};

// "chapter-01" -> "Chapter One"
const formatChapterLabel = (chapterId) => {
  const match = /(\d+)$/.exec(chapterId || "");

  if (!match) return chapterId || "";

  const number = Number(match[1]);

  return number < 100
    ? `Chapter ${numberToWords(number)}`
    : `Chapter ${number}`;
};

const IntroductionContent = ({ chapter }) => {
  const [data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    let cancelled = false;

    getPronunciation(chapter)
      .then((result) => {
        if (cancelled) return;
        setData({
          title: result?.chapterTitle || "",
          description: result?.IntroductionDescription || "",
        });
      })
      .catch((error) => {
        if (!cancelled) console.error("Erro ao buscar a introdução:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [chapter]);

  return (
    <section className="introduction">
      <h1 className="introduction__title">
        {formatChapterLabel(chapter)}: <span>{data.title}</span>
      </h1>
      <p className="introduction__text">{data.description}</p>
    </section>
  );
};

const Introduction = ({ chapter }) => {
  return <IntroductionContent key={chapter} chapter={chapter} />;
};

export default Introduction;
