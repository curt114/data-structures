import { useEffect, useState } from "react";
import styles from "./Intersection.module.css";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";

const parametersList = [
  [
    [4, 2, 1, 6],
    [3, 6, 9, 2, 10],
  ],
  [
    [2, 4, 6],
    [4, 2],
  ],
  [
    [4, 2, 1],
    [1, 2, 4, 6],
  ],
  [
    [0, 1, 2],
    [10, 11],
  ],
];

function algorithm(arrOne, arrTwo) {
  /*
    1. Create an array with the results of intersection.
    2. Create a set from arrOne.
    3. Loop through arrTwo.
    4. If arrOneSet has the value in arrTwo, push it to result.
    5. Return result
  */
  const result = [];
  const arrOneSet = new Set(arrOne);
  let iterations = 0;
  const data = {};

  for (let i = 0; i < arrTwo.length; i++) {
    if (arrOneSet.has(arrTwo[i])) {
      let findIndex = -1;
      [...arrOneSet].forEach((value, index) => {
        if (value === arrTwo[i]) findIndex = index;
      });
      result.push(arrTwo[i]);
      data[iterations] = {
        result: [...result],
        arrOnePointers: [findIndex],
        arrTwoPointers: [i],
        resultPointers: [],
      };
      iterations++;
    } else {
      data[iterations] = {
        result: [...result],
        arrOnePointers: [],
        arrTwoPointers: [i],
        resultPointers: [],
      };
      iterations++;
    }
  }

  return { iterations, data, result };
}

function Intersection() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [parameters, setParameters] = useState(parametersList[0]);
  const [parameterOne, parameterTwo] = parameters;
  const parameterOneSet = new Set(parameterOne);

  function handleParameters(e) {
    setParameters(parametersList[e.target.value]);
  }

  useEffect(() => {
    const { iterations, data, result } = algorithm(parameterOne, parameterTwo);
    setResults({ iterations, data, result });
    setIsLoading(false);
  }, [parameters]);

  function drawQuestion() {
    return (
      <QuestionCard>
        <QuestionCard.Header title={"intersection"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500)" }}>intersection</span>,
            that takes in two arrays, arrOne, arrTwo, as arguments. The function
            should return a new array containing elements that are in both of
            the two arrays.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            You may assume that each input array does not contain duplicate
            elements.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"intersection"}
            parameter={"[4, 2, 1, 6], [3, 6, 9, 2, 10]"}
            result={"[6, 2]"}
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
          <ArrayCard.DrawArray
            label={"Array One Set"}
            arrName={"arrOne"}
            arr={parameterOne}
            data={results.data}
            indicies={Object.keys(parameterOne)}
            showIndicies={true}
            showPointers={false}
          />
          <ArrayCard.DrawArray
            label={"Array Two"}
            arrName={"arrTwo"}
            arr={parameterTwo}
            data={results.data}
            indicies={Object.keys(parameterTwo)}
          />
          <ArrayCard.DrawArrayStep
            label={"Result"}
            arrLength={results.result.length}
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

export default Intersection;
