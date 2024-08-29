import { useEffect, useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./PairProduct.module.css";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";

const parametersList = [
  [[3, 2, 5, 4, 1], 8],
  [[3, 2, 5, 4, 1], 10],
  [[4, 7, 9, 2, 5, 1], 5],
  [[4, 7, 9, 2, 5, 1], 35],
  [[4, 6, 8, 2], 16],
];

function algorithm(arr, target) {
  const hashMap = {};
  let iterations = 0;
  const data = {};
  let result = null;

  for (let i = 0; i < arr.length; i++) {
    const remainder = target % arr[i];
    if (!remainder) {
      const pair = target / arr[i];
      if (`~${pair}` in hashMap) {
        data[iterations] = {
          target,
          remainder,
          pair,
          hashMap: { ...hashMap },
          arrOnePointers: [i],
          hashMapPointers: [`~${pair}`],
        };
        iterations++;
        result = [hashMap[`~${pair}`], i];
        return { iterations, data, result };
      } else {
        hashMap[`~${arr[i]}`] = i;
        data[iterations] = {
          target,
          remainder,
          pair,
          hashMap: { ...hashMap },
          arrOnePointers: [i],
          hashMapPointers: [`~${arr[i]}`],
        };
        iterations++;
      }
    } else {
      data[iterations] = {
        target,
        remainder,
        pair: null,
        hashMap: { ...hashMap },
        arrOnePointers: [i],
        hashMapPointers: [],
      };
      iterations++;
    }
  }
}

function PairProduct() {
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
        <QuestionCard.Header title={"pair product"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500" }}>pairProduct</span>, that
            takes in an array and a target product as arguments. The function
            should return an array containing a pair of indices whose elements
            multiply to the given target. The indices returned must be unique.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            Be sure to return the indices, not the elements themselves.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            There is guaranteed to be one such pair whose product is the target.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"pairProduct"}
            parameter={"[3, 2, 5, 4, 1], 8"}
            result={"[1, 3]"}
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
            label="Hash Map"
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
              label={"Remainder"}
              varName={"remainder"}
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

export default PairProduct;
