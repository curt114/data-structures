import { useEffect, useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./MostFrequentChar.module.css";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";

const parametersList = [
  ["bookeeper"],
  ["david"],
  ["abby"],
  ["mississippi"],
  ["potato"],
  ["eleventennine"],
  ["riverbed"],
];

function algorithm(str) {
  /*
    1. Loop through the string, and store in an object
       character as the key, and occurrance as the value.
    2. Store in a variable the max character occurrance.
    3. Loop through string one more time, first character
       with the max character occurrance will be returned.
  */
  const hashMap = {};
  let maxCharOccurrence = 0;
  let iterations = 0;
  const data = {};

  for (let i = 0; i < str.length; i++) {
    if (str[i] in hashMap) hashMap[str[i]]++;
    else hashMap[str[i]] = 1;
    if (hashMap[str[i]] > maxCharOccurrence) {
      maxCharOccurrence = hashMap[str[i]];
    }
    data[iterations] = {
      maxCharOccurrence,
      arrOnePointers: [i],
      hashMapPointers: [str[i]],
      hashMap: { ...hashMap },
    };
    iterations++;
  }

  for (let i = 0; i < str.length; i++) {
    data[iterations] = {
      maxCharOccurrence,
      arrOnePointers: [i],
      hashMapPointers: [str[i]],
      hashMap: { ...hashMap },
    };
    iterations++;
    if (hashMap[str[i]] === maxCharOccurrence)
      return { iterations, data, result: str[i] };
  }
}

function MostFrequentChar() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [parameters, setParameters] = useState(parametersList[0]);
  const [parameterOne] = parameters;
  const parameterOneSet = new Set(parameterOne);

  function handleInput(e) {
    setParameters(parametersList[e.target.value]);
  }

  useEffect(() => {
    const { iterations, data, result } = algorithm(parameterOne);
    setResults({ iterations, data, result });
    setIsLoading(false);
  }, [parameters]);

  function drawQuestion() {
    return (
      <QuestionCard>
        <QuestionCard.Header title={"most frequent char"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500)" }}>mostFrequentChar</span>
            , that takes in a string as an argument. The function should return
            the most frequent character of the string. If there are ties, return
            the character that appears earlier in the string.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            You can assume that the input string is non-empty.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"mostFrequentChar"}
            parameter={'"bookeeper"'}
            result="e"
          />
          <QuestionCard.Parameters
            parametersList={parametersList}
            handleInput={handleInput}
          />
        </QuestionCard.Body>
      </QuestionCard>
    );
  }

  function drawSolution() {
    return (
      <ArrayCard iterations={results.iterations} input={parameterOne}>
        <ArrayCard.Header iterations={results.iterations} />
        <ArrayCard.Body>
          <ArrayCard.DrawHashMap
            label={"Hash Map"}
            argSetLength={parameterOneSet.size}
            data={results.data}
          />
          <ArrayCard.DrawArray
            label={"Array One"}
            arrName={"arrOne"}
            arr={[...parameterOne]}
            data={results.data}
            indicies={Object.keys(parameterOne)}
          />
          <div className={styles.variables}>
            <ArrayCard.DrawVariable
              label={"Max Character Count"}
              varName={"maxCharOccurrence"}
              data={results.data}
            />
            <ArrayCard.DrawResultString result={results.result} />
          </div>
          <ArrayCard.MediaControls />
        </ArrayCard.Body>
      </ArrayCard>
    );
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.pageContainer}>
          {drawQuestion()}
          {drawSolution()}
        </div>
      )}
    </>
  );
}

export default MostFrequentChar;
