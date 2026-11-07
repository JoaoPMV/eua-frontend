import Introduction from "../components/Introduction";
import CharacterCard from "../components/CharacterCard";
import Pronunciation from "../components/Pronunciation";
import Reading from "../components/Reading";
import Vocabulary from "../components/Vocabulary";
import Grammar from "../components/Grammar";

import "./home.css";

const Home = () => {
  return (
    <>
      <div className="chapter-container">
        <Introduction
          chapter="chapter-01"
          background="url('/images/eua-chapter-01.png')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <CharacterCard chapter="chapter-01" />
        <Pronunciation
          chapter="chapter-01"
          background="url('/images/eua-chapter-01.png')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Reading
          chapter="chapter-01"
          background="url('/images/eua-chapter-01.png')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Vocabulary
          chapter="chapter-01"
          background="url('/images/eua-chapter-01.png')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Grammar
          chapter="chapter-01"
          background="url('/images/eua-chapter-01.png')"
          mobileBackground="url('/images/eua-grammar-mobile.png')"
        />
      </div>
    </>
  );
};

export default Home;
