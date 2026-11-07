import "./Grammar.css";

const Grammar = ({ background, mobileBackground }) => {
  // background e mobileBackground recebem o valor CSS completo,
  // por exemplo: "url('/images/india.jpeg')"
  const style = {};

  if (background) style["--grammar-bg"] = background;

  // Sem imagem mobile, o CSS reaproveita a imagem desktop
  if (mobileBackground) style["--grammar-bg-mobile"] = mobileBackground;

  return (
    <section className="grammar-container" style={style}>
      <h2 className="grammar-section-title">
        Simple present<span className="teste">( I , you )</span>
      </h2>

      <p className="grammar-section-intro">
        É usado para falar de ações, situações, hábitos e fatos relacionados ao
        presente. As sentenças afirmativas seguem uma ordem bem delimitada:
        <span className="auxiliars"> sujeito + verbo + complemento.</span>
        Nas sentenças negativas, usa-se o auxiliar
        <span className="auxiliars"> don't </span>
        antes do verbo. Nas sentenças interrogativas, usa-se o auxiliar
        <span className="auxiliars"> do </span>
        no início da pergunta.
      </p>

      <h3 className="grammar-section-heading">Exemplos</h3>

      <ul className="grammar-section__uses">
        <li className="grammar-section-use">
          I want to experience a different culture
        </li>
        <li className="grammar-section-use">I don't like sports</li>
        <li className="grammar-section-use">I work as a delivery driver</li>
        <li className="grammar-section-use">You like playing video games.</li>
        <li className="grammar-section-use">Do you speak Spanish?</li>
      </ul>
    </section>
  );
};

export default Grammar;
