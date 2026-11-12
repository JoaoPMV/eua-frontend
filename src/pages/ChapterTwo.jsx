import Introduction from "../components/Introduction";
import Listening from "../components/Listening";
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
          chapter="chapter-02"
          background="url('/images/eua-chapter-02.jpeg')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Listening
          chapter="chapter-02"
          background="url('/images/eua-chapter-02.jpeg')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Reading
          chapter="chapter-02"
          background="url('/images/eua-chapter-02.jpeg')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />

        <Vocabulary
          chapter="chapter-02"
          background="url('/images/eua-chapter-02.jpeg')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Pronunciation
          chapter="chapter-02"
          background="url('/images/eua-chapter-02.jpeg')"
          mobileBackground="url('/images/india-mobile.jpeg')"
        />
        <Grammar
          chapter="chapter-01"
          background="url('/images/eua-chapter-02.jpeg')"
          mobileBackground="url('/images/eua-grammar-mobile.png')"
        />
      </div>
    </>
  );
};

export default Home;
