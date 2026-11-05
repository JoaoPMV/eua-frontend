import "./Grammar.css";

const SimplePresent = () => {
  return (
    <section className="grammar-section">
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

      <h3 className="grammar-section-heading">Estrutura</h3>

      <dl className="grammar-section-forms">
        <div className="grammar-section-form">
          <dt>Affirmative</dt>
          <dd>I live in Norway</dd>
        </div>

        <div className="grammar-section-form">
          <dt>Negative</dt>
          <dd>I don't live in Norway</dd>
        </div>

        <div className="grammar-section-form">
          <dt>Question</dt>
          <dd>Do you live in Norway?</dd>
        </div>
      </dl>

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

export default SimplePresent;
