import "./Grammar.css";

const forms = [
  {
    label: "Afirmativa",
    example: "I have been working. / She has been working.",
  },
  {
    label: "Negativa",
    example: "I haven't been working. / She hasn't been working.",
  },
  {
    label: "Pergunta",
    example: "Have you been working? / How long has he been working?",
  },
];

const uses = [
  {
    title: "Ação que começou no passado e continua agora",
    example: "I've been working here for four years.",
    translation: "Trabalho aqui há quatro anos (e ainda trabalho).",
  },
  {
    title: "Ação recém terminada, com efeito visível",
    example: "I'm tired because I've been running.",
    translation: "Estou cansado porque estive correndo.",
  },
  {
    title: "Ação repetida em um período recente",
    example: "He's been calling me all day.",
    translation: "Ele tem me ligado o dia todo.",
  },
];

const differences = [
  {
    title: "Resultado ou atividade",
    simple: {
      example: "I've painted the room.",
      note: "O quarto está pronto. O foco é o resultado.",
    },
    continuous: {
      example: "I've been painting the room.",
      note: "Estive pintando. O foco é a atividade, e pode não ter terminado.",
    },
  },
  {
    title: "Quantidade ou duração",
    simple: {
      example: "How many books have you read?",
      note: "Pergunta sobre quantas vezes ou quantos itens.",
    },
    continuous: {
      example: "How long have you been reading?",
      note: "Pergunta sobre por quanto tempo.",
    },
  },
  {
    title: "Ação concluída ou em andamento",
    simple: {
      example: "She has written five emails.",
      note: "Cinco e-mails concluídos.",
    },
    continuous: {
      example: "She has been writing emails all morning.",
      note: "Ela passou a manhã nessa atividade.",
    },
  },
];

const Grammar = () => {
  return (
    <section className="ppc">
      <h2 className="ppc__title">Present perfect continuous</h2>
      <p className="ppc__intro">
        Fala de uma ação que começou no passado e tem ligação com o presente. O
        foco está na duração ou na atividade em si, e não no resultado.
      </p>

      <h3 className="ppc__heading">Estrutura</h3>
      <p className="ppc__formula">have / has + been + verbo com -ing</p>
      <dl className="ppc__forms">
        {forms.map(({ label, example }) => (
          <div className="ppc__form" key={label}>
            <dt>{label}</dt>
            <dd>{example}</dd>
          </div>
        ))}
      </dl>

      <h3 className="ppc__heading">Quando usar</h3>
      <ul className="ppc__uses">
        {uses.map(({ title, example, translation }) => (
          <li className="ppc__use" key={title}>
            <p className="ppc__use-title">{title}</p>
            <p className="ppc__example">{example}</p>
            <p className="ppc__translation">{translation}</p>
          </li>
        ))}
      </ul>

      <h3 className="ppc__heading">For e since</h3>
      <div className="ppc__compare">
        <div className="ppc__compare-item">
          <p className="ppc__use-title">for indica a duração</p>
          <p className="ppc__example">for two hours, for three years</p>
        </div>
        <div className="ppc__compare-item">
          <p className="ppc__use-title">since indica o ponto de partida</p>
          <p className="ppc__example">since 2019, since Monday, since 8 a.m.</p>
        </div>
      </div>

      <h3 className="ppc__heading">
        Present perfect ou present perfect continuous?
      </h3>
      <p className="ppc__intro">
        Os dois ligam o passado ao presente. O present perfect (have/has +
        particípio) destaca o resultado ou a quantidade. O present perfect
        continuous destaca a atividade e a duração.
      </p>
      <ul className="ppc__differences">
        {differences.map(({ title, simple, continuous }) => (
          <li className="ppc__difference" key={title}>
            <p className="ppc__use-title">{title}</p>
            <div className="ppc__compare">
              <div className="ppc__compare-item">
                <p className="ppc__label">Present perfect</p>
                <p className="ppc__example">{simple.example}</p>
                <p className="ppc__translation">{simple.note}</p>
              </div>
              <div className="ppc__compare-item">
                <p className="ppc__label">Present perfect continuous</p>
                <p className="ppc__example">{continuous.example}</p>
                <p className="ppc__translation">{continuous.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="ppc__note">
        Com verbos como work, live, study e teach, usados com for ou since, os
        dois tempos têm quase o mesmo sentido:{" "}
        <strong>I've lived here for years</strong> e{" "}
        <strong>I've been living here for years</strong>.
      </p>

      <p className="ppc__note">
        Verbos de estado, como know, like, love e be, normalmente não usam o
        contínuo. O correto é <strong>I've known him for years</strong>, e não
        <em> I've been knowing</em>.
      </p>
    </section>
  );
};

export default Grammar;
