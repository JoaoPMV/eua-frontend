import "./Grammar.css";

const SimplePresent = () => {
  return (
    <section className="grammar-section">
      <h2 className="grammar-section-title">Simple present</h2>

      <p className="grammar-section-intro">
        É usado para falar de ações, situações, hábitos e fatos relacionados ao
        presente. Como estamos começando os estudos, é importante compreender
        duas categorias de verbos em inglês:
      </p>
      <p>
        1º - Esta primeira categoria é formada por somente um verbo em inglês. O
        verbo to be. Isso acontece porque este verbo recebe regras únicas, que
        são válidas somente para ele.
      </p>
      <p>2º - Esta categoria compreende cerca de 95% dos verbos.</p>
      <p>
        3º - Esta categoria compreende os verbos que não se enquadram nas duas
        categorias acima. Corresponde a poucos verbos. Vamos aprender somente
        nas próximas aulas
      </p>

      <h3 className="grammar-section__category">Other Verbs</h3>

      <h3 className="grammar-section__heading">Estrutura</h3>

      <p className="grammar-section-formula">Sujeito + Verbo + Complemento</p>

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

      <p className="grammar-section__note">
        Perceba que: na negativa, acrescentamos <strong>don't</strong> antes do
        verbo. Na interrogativa, acrescentamos o auxiliar <strong>do</strong> no
        início da pergunta.
      </p>

      <h3 className="grammar-section__heading">More examples</h3>

      <ul className="grammar-section__uses">
        <li className="grammar-section__use">
          <p className="grammar-section__example">
            I want to experience a different culture
          </p>
          <p className="grammar-section__translation">
            Quero conhecer uma cultura diferente.
          </p>
        </li>

        <li className="grammar-section__use">
          <p className="grammar-section__example">
            I work as a delivery driver
          </p>
          <p className="grammar-section__translation">
            Eu trabalho como motorista de entrega.
          </p>
        </li>

        <li className="grammar-section__use">
          <p className="grammar-section__example">
            I like playing video games.
          </p>
          <p className="grammar-section__translation">
            Eu gosto de jogar videogames.
          </p>
        </li>

        <li className="grammar-section__use">
          <p className="grammar-section__example">I don't play any sports</p>
          <p className="grammar-section__translation">
            Eu não pratico nenhum esporte.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default SimplePresent;
