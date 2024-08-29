import styles from "./QuestionCard.module.css";

function QuestionCard({ children }) {
  return <div className={`${styles.questionCard}`}>{children}</div>;
}

function Header({ title }) {
  return (
    <header>
      <h3 className={`${styles.questionCard__title} text-2xl`}>{title}</h3>
    </header>
  );
}

function Body({ children }) {
  return <div className={styles.questionCard__content}>{children}</div>;
}

function Paragraph({ children }) {
  return <p>{children}</p>;
}

function Result({ name, parameter, result }) {
  return (
    <p>
      <span className={styles["questionCard--primary"]}>{name}</span>(
      <span className={styles["questionCard--secondary"]}>{parameter}</span>
      ); // -&gt; {result}
    </p>
  );
}

function Parameters({ parametersList, handleInput }) {
  const displayList = [];

  for (let i = 0; i < parametersList.length; i++) {
    let str = "";
    for (let j = 0; j < parametersList[i].length; j++) {
      j < parametersList[i].length - 1
        ? (str += Array.isArray(parametersList[i][j])
            ? `[${parametersList[i][j]}], `
            : `${parametersList[i][j]}, `)
        : (str += Array.isArray(parametersList[i][j])
            ? `[${parametersList[i][j]}]`
            : `${parametersList[i][j]}`);
    }

    displayList.push(str);
  }

  return (
    <div className={styles.questionCard__argument}>
      <label>Choose Argument(s):</label>
      <select
        className={styles["questionCard__argument--select"]}
        onChange={handleInput}
      >
        {displayList.map((value, index) => (
          <option key={value} value={index}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

QuestionCard.Header = Header;
QuestionCard.Body = Body;
QuestionCard.Paragraph = Paragraph;
QuestionCard.Result = Result;
QuestionCard.Parameters = Parameters;

export default QuestionCard;
