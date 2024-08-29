import { useEffect, useState } from "react";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./Uncompress.module.css";

const parametersList = [["2p1o5p3z5a"], ["2c3a1t"], ["3n12e2z"], ["4s2b"]];

function algorithm(str) {
  let pointerOne = 0;
  let pointerTwo = 0;
  let iterations = 0;
  const result = [];
  const data = {};
  let numbers = "0123456789";

  while (pointerTwo < str.length) {
    if (numbers.includes(str[pointerTwo])) {
      data[iterations] = {
        arrOnePointers: [pointerOne, pointerTwo],
        result: [...result],
      };
      pointerTwo++;
      iterations++;
    } else {
      const number = parseInt(str.slice(pointerOne, pointerTwo));
      for (let i = 0; i < number; i++) {
        result.push(str[pointerTwo]);
        data[iterations] = {
          arrOnePointers: [pointerOne, pointerTwo],
          result: [...result],
        };
        iterations++;
      }
      pointerTwo++;
      pointerOne = pointerTwo;
    }
  }

  return { iterations, result, data };
}

function Uncompress() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState(parametersList[0]);
  const inputToString = [...input].join("");

  function handleInput(e) {
    setInput(parametersList[e.target.value]);
  }

  useEffect(() => {
    const { iterations, result, data } = algorithm(inputToString);
    setResults({ iterations, result, data });
    setIsLoading(false);
  }, [input]);

  function drawQuestion() {
    return (
      <QuestionCard>
        <QuestionCard.Header title={"uncompress"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500)" }}>uncompress</span>, that
            takes in a string as an argument. The input string will be formatted
            into multiple groups according to the following pattern:
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            The function should return an uncompressed version of the string
            where each char of a group is repeated <em>&apos;number&apos;</em>{" "}
            times consecutively. You may assume that the input string is
            well-formed according to the previously mentioned pattern.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"uncompress"}
            parameter={'"2p1o5p3z5a"'}
            result={"ppopppppzzaaaaa"}
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
      <ArrayCard iterations={results.iterations} input={input}>
        <ArrayCard.Header iterations={results.iterations}></ArrayCard.Header>
        <ArrayCard.Body>
          <ArrayCard.DrawArray
            label={"String One"}
            arrName={"arrOne"}
            arr={[...inputToString]}
            indicies={Object.keys(inputToString)}
            data={results.data}
            addPointer={false}
          />
          <ArrayCard.DrawResult arr={results.result} data={results.data} />
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

export default Uncompress;
