import { useEffect, useState } from "react";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";
import styles from "./Compress.module.css";

const parametersList = [["ccaaatsss"], ["ssssbbz"], ["ppoppppp"]];

function algorithm(str) {
  let pointerOne = 0;
  let pointerTwo = 0;
  let iterations = 0;
  const result = [];
  const data = {
    [iterations]: { arrOnePointers: [pointerOne, pointerTwo], result: [] },
  };

  while (pointerTwo <= str.length) {
    if (str[pointerOne] === str[pointerTwo]) {
      pointerTwo++;
    } else {
      const count = pointerTwo - pointerOne;
      if (count === 1) result.push(str[pointerOne]);
      else result.push(String(count), str[pointerOne]);
      pointerOne = pointerTwo;
    }
    iterations++;

    data[iterations] = {
      arrOnePointers: [pointerOne, pointerTwo],
      result: [...result],
    };
  }
  return { iterations, result, data };
}

function Compress() {
  const [input, setInput] = useState(parametersList[0]);
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
        <QuestionCard.Header title={"compress"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500)" }}>compress</span>, that
            takes in a string as an argument. The function should return a
            compressed version of the string where consecutive occurrences of
            the same characters are compressed into the number of occurrences
            followed by the character. Single character occurrences should not
            be changed.
          </QuestionCard.Paragraph>
          <QuestionCard.Paragraph>
            You can assume that the input only contains alphabetic characters.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"compress"}
            parameter={'"ccaaatsss"'}
            result={"2c3at3s"}
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
            data={results.data}
            indicies={Object.keys(inputToString)}
            addPointer={true}
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
        <p>Loading</p>
      ) : (
        <div className={styles.pageContainer}>
          {drawQuestion()}
          {drawSolution()}
        </div>
      )}
    </>
  );
}

export default Compress;
