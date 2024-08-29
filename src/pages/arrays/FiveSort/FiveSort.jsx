import { useEffect, useState } from "react";
import styles from "./FiveSort.module.css";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";

const parametersList = [
  [[12, 5, 1, 5, 12, 7]],
  [[5, 2, 5, 6, 5, 1, 10, 2, 5, 5]],
  [[5, 5, 5, 1, 1, 1, 4]],
  [[5, 5, 6, 5, 5, 5, 5]],
];

function algorithm(arr) {
  /*
    1. Loop through the arr.
    2. If arr[index] === 5, pop value and append it.
    3. Return arr
  */

  let indexOne = 0;
  let iterations = 0;
  const data = {};

  for (let indexTwo = 0; indexTwo < arr.length; indexTwo++) {
    if (arr[indexOne] === 5) {
      const removedElement = arr.splice(indexOne, 1)[0];
      arr.push(removedElement);
      data[iterations] = {
        result: [...arr],
        resultPointers: [indexOne, arr.length - 1],
      };
    } else {
      data[iterations] = {
        result: [...arr],
        resultPointers: [indexOne],
      };
      indexOne++;
    }
    iterations++;
  }
  return { iterations, data };
}

function FiveSort() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [parameters, setParameters] = useState(parametersList[0]);
  const [parameterOne] = parameters;

  function handleParameters(e) {
    setParameters(parametersList[e.target.value]);
  }

  useEffect(() => {
    const { iterations, data } = algorithm([...parameterOne]);
    setResults({ iterations, data });
    setIsLoading(false);
  }, [parameters]);

  function drawQuestion() {
    return (
      <QuestionCard>
        <QuestionCard.Header title={"five sort"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500" }}>fiveSort</span>, that
            takes in an array of numbers as an argument. The function should
            rearrange elements of the array such that all 5s appear at the end.
            Your function should perform this operation in-place by mutating the
            original array. The function should return the array.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            Elements that are not 5 can appear in any order in the output, as
            long as all 5s are at the end of the array.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"fiveSort"}
            parameter={"[12, 5, 1, 5, 12, 7]"}
            result={"[12, 1, 12, 7, 5, 5]"}
          />
          <QuestionCard.Parameters
            parametersList={parametersList}
            handleInput={handleParameters}
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
          <ArrayCard.DrawArrayStep
            label={"Result"}
            arrLength={parameterOne.length}
            data={results.data}
          />
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

export default FiveSort;
