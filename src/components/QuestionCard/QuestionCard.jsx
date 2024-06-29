import styles from "./QuestionCard.module.css";
// import "../../global.css";

function QuestionCard() {
  return (
    <div className={`${styles.container}`}>
      <header>
        <p className={`${styles.title} text-2xl`}>uncompress</p>
      </header>
      <div className={styles.content}>
        <p>
          Write a function, <span className={styles.function}>uncompress</span>,
          that takes in a string as an argument. The input string will be
          formatted into multiple groups according to the following pattern:
        </p>
        <p>
          The function should return an uncompressed version of the string where
          each char of a group is repeated <em>&apos;number&apos;</em> times
          consecutively. You may assume that the input string is well-formed
          according to the previously mentioned pattern.
        </p>
        <p>
          <span className={styles.function}>uncompress</span>(
          <span className={styles.argument}>&quot;2p1o5p3z5a&quot;</span>); //
          -&gt; ppopppppzzaaaaa
        </p>
        <div className={styles.selectContainer}>
          <label>Choose a string:</label>
          <select className={styles.dropDown}>
            <option value="option1" className={styles.option}>
              {" "}
              2p1o5p3z5a
            </option>
            <option value="option1"> Option 2</option>
            <option value="option1"> Option 3</option>
            <option value="option1"> Option 4</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
