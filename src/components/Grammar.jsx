import "./Grammar.css";

const Grammar = ({ background, mobileBackground }) => {
  // background e mobileBackground recebem o valor CSS completo,
  // por exemplo: "url('/images/india.jpeg')"
  const style = {};

  if (background) style["--image-bg"] = background;

  // Sem imagem mobile, o CSS reaproveita a imagem desktop
  if (mobileBackground) style["--image-bg-mobile"] = mobileBackground;

  return (
    <section className="page-container" style={style}>
      <h1 className="page-title">Grammar</h1>
      <h2 className="grammar-content">
        Simple present <span className="teste">( I , you )</span>
      </h2>

      <p className="page-description">
        É usado para falar de ações, situações, hábitos e fatos relacionados ao
        presente. As sentenças afirmativas seguem uma ordem bem delimitada:
        sujeito + verbo + complemento. Nas sentenças negativas, usa-se o
        auxiliar don't antes do verbo. Nas sentenças interrogativas, usa-se o
        auxiliar do no início da pergunta.
      </p>

      <h3 className="grammar-examples">Exemplos</h3>

      <ul className="grammar-examples-ul">
        <li>I want to experience a different culture</li>
        <li>I don't like sports</li>
        <li>I work as a delivery driver</li>
        <li>You like playing video games.</li>
        <li>Do you speak Spanish?</li>
      </ul>
    </section>
  );
};

export default Grammar;
