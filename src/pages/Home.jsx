import Introduction from "../components/Introduction";
import CharacterCard from "../components/CharacterCard";
import Pronunciation from "../components/Pronunciation";
import Reading from "../components/Reading";
import Vocabulary from "../components/Vocabulary";
import SimplePresentOne from "../components/SimplePresentOne";

import "./home.css";

const Home = () => {
  return (
    <>
      <div className="chapter-container">
        <Introduction chapter="chapter-01" />
        <CharacterCard chapter="chapter-01" />
        <Pronunciation chapter="chapter-01" />
        <Reading chapter="chapter-01" />
        <Vocabulary chapter="chapter-01" />
        <SimplePresentOne chapter="chapter-01" />
      </div>
    </>
  );
};

export default Home;
