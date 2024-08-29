import { useEffect, useState } from "react";
import ArrayCard from "../../../components/ArrayCard/ArrayCard";
import QuestionCard from "../../../components/QuestionCard/QuestionCard";
import styles from "./Anagrams.module.css";

const parametersList = [
  ["restful", "fluster"],
  ["cats", "tocs"],
  ["monkeyswrite", "newyorktimes"],
  ["paper", "reapa"],
  ["elbow", "below"],
  ["tax", "taxi"],
  ["taxi", "tax"],
  ["night", "thing"],
  ["abbc", "aabc"],
  ["po", "popp"],
];

function algorithm(strOne, strTwo) {
  /*
    1. Initialize str_one to ha hash map. Key = letter / value = 0
    2. Loop through str_two, if letter not found in hash_map, return
       false, else subtract 1 from the hash_map's letter value.
    3. Loop through the hash_map, if any value is not zero, return false.
    4. Return True
  */
  const hashMap = {};
  let iterations = 0;
  const data = {};
  let result = false;

  for (let i = 0; i < strOne.length; i++) {
    if (strOne[i] in hashMap) hashMap[strOne[i]] += 1;
    else hashMap[strOne[i]] = 1;
    data[iterations] = {
      arrOnePointers: [i],
      arrTwoPointers: [],
      hashMapPointers: [strOne[i]],
      hashMap: { ...hashMap },
    };
    iterations++;
  }

  for (let i = 0; i < strTwo.length; i++) {
    data[iterations] = {
      arrOnePointers: [],
      arrTwoPointers: [i],
      hashMapPointers: [strTwo[i]],
      hashMap: { ...hashMap },
    };

    iterations++;

    if (strTwo[i] in hashMap) hashMap[strTwo[i]] -= 1;
    else return { iterations, data, result };
  }

  const keys = Object.keys(hashMap);
  const values = Object.values(hashMap);
  for (let i = 0; i < values.length; i++) {
    data[iterations] = {
      arrOnePointers: [],
      arrTwoPointers: [],
      hashMapPointers: [keys[i]],
      hashMap: { ...hashMap },
    };

    iterations++;
    if (values[i] !== 0) {
      return { iterations, data, result };
    }
  }

  result = true;
  return { iterations, data, result };
}

function Anagrams() {
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
        <QuestionCard.Header title={"anagrams"} />
        <QuestionCard.Body>
          <QuestionCard.Paragraph>
            Write a function,{" "}
            <span style={{ color: "var(--indigo-500)" }}>anagram</span>, that
            takes in two strings as arguments. The function should return a
            boolean indiciating whether or not the strings are anagrams.
            Anagrams are strings that contain the same characters, but in any
            order.
          </QuestionCard.Paragraph>
          <QuestionCard.Result
            name={"anagrams"}
            parameter={'"restful", "fluster"'}
            result={"true"}
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
        <ArrayCard.Header iterations={results.iterations}></ArrayCard.Header>
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
          <ArrayCard.DrawArray
            label={"Array Two"}
            arrName={"arrTwo"}
            arr={[...parameterTwo]}
            data={results.data}
            indicies={Object.keys(parameterTwo)}
          />
          <ArrayCard.DrawResultBoolean result={results.result} />
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

export default Anagrams;
