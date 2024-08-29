import { useEffect, useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./PairSum.module.css";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";

const parametersList = [
  [[3, 2, 5, 4, 1], 8],
  [[4, 7, 9, 2, 5, 1], 5],
  [[4, 7, 9, 2, 5, 1], 3],
  [[1, 6, 7, 2], 13],
  [[9, 9], 18],
  [[6, 4, 2, 8], 12],
];

function algorithm(arr, target) {
  /*
    1. For each element in the arr, subtract target - element.
       Store the current element as the key in compliments object and
       its indice as the value.
    2. Check if the compliment value is stored in compliments object. If
       it is, return the pair of indices.

       {
          3: 0,   Iteration 1
          2: 1,   Iteration 2
                  Iteration 3: 8 - 5 = 3 return [0, 2]
       }
  */
  const hashMap = {};
  let iterations = 0;
  const data = {};
  let result = null;

  for (let index in arr) {
    const compliment = target - arr[index];

    if (`~${compliment}` in hashMap) {
      data[iterations] = {
        target,
        compliment,
        hashMap: { ...hashMap },
        arrOnePointers: [parseInt(index)],
        hashMapPointers: [`~${compliment}`],
      };
      iterations++;
      result = [hashMap[`~${compliment}`], index];
      return { iterations, data, result };
    } else {
      hashMap[`~${arr[index]}`] = index;

      data[iterations] = {
        target,
        compliment,
        hashMap: { ...hashMap },
        arrOnePointers: [parseInt(index)],
        hashMapPointers: [],
      };
      iterations++;
    }
  }
}

function PairSum() {
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
        <QuestionCard.Header title={"pair sum"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500)" }}>pairSum</span>, that
            takes in an array and a target sum as arguments. The function should
            return an array containing a pair of indices whose elements sum to
            the given target. The indices returned must be unique.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            Be sure to return the indices, not the elements themselves.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            There is guaranteed to be one such pair that sums to the target.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"pairSum"}
            parameter={"[3, 2, 5, 4, 1], 8"}
            result={"[0, 2]"}
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
          <ArrayCard.DrawHashMap
            label={"Hash Map"}
            argSetLength={parameterOneSet.size}
            data={results.data}
          />
          <ArrayCard.DrawArray
            label={"Array One"}
            arrName={"arrOne"}
            arr={parameterOne}
            data={results.data}
            indicies={Object.keys(parameterOne)}
          />
          <div className={styles.variables}>
            <ArrayCard.DrawVariable
              label={"Target"}
              varName={"target"}
              data={results.data}
            />
            <ArrayCard.DrawVariable
              label={"Compliment"}
              varName={"compliment"}
              data={results.data}
            />
            <ArrayCard.DrawResultArray result={results.result} />
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

export default PairSum;
