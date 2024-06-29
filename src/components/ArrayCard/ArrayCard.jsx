import { createContext, useContext, useEffect, useState } from "react";
import styles from "./ArrayCard.module.css";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  PlayIcon,
  CodeBracketIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

const CardContext = createContext();

function ArrayCard({ iterations, children }) {
  const [activeStep, setActiveStep] = useState(0);
  const [videoMode, setVideoMode] = useState(true);

  useEffect(() => {
    let intervalId;

    if (videoMode) {
      intervalId = setInterval(() => {
        if (activeStep < iterations - 1) {
          setActiveStep((previousStep) => previousStep + 1);
        } else {
          setActiveStep(0);
        }
      }, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [activeStep, videoMode]);

  function handleNextStep() {
    if (activeStep < iterations - 1) {
      setVideoMode(false);
      setActiveStep((previousStep) => previousStep + 1);
    }
  }

  function handlePreviousStep() {
    if (activeStep > 0) {
      setVideoMode(false);
      setActiveStep((previousStep) => previousStep - 1);
    }
  }

  function handleVideoMode() {
    setActiveStep(0);
    setVideoMode(!videoMode);
  }

  return (
    <CardContext.Provider
      value={{
        activeStep,
        videoMode,
        handleNextStep,
        handlePreviousStep,
        handleVideoMode,
      }}
    >
      <div className={styles.container}>{children}</div>
    </CardContext.Provider>
  );
}

function Head({ iterations }) {
  const { activeStep, videoMode, handleVideoMode } = useContext(CardContext);

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        Iteration {activeStep + 1}/{iterations}
      </div>
      <div>
        <div className={styles.iconContainer}>
          {videoMode ? (
            <button className={styles.iconButton} onClick={handleVideoMode}>
              <PauseIcon className={styles.titleIcon} />
            </button>
          ) : (
            <button className={styles.iconButton} onClick={handleVideoMode}>
              <PlayIcon className={styles.titleIcon} />
            </button>
          )}
          <button className={styles.iconButton}>
            <CodeBracketIcon className={styles.titleIcon} />
          </button>
        </div>
        <div></div>
      </div>
    </header>
  );
}

function Body({ children }) {
  return <div className={styles.content}>{children}</div>;
}

function DrawPointers({ arr, data }) {
  const { activeStep } = useContext(CardContext);
  const pointers = data[activeStep].pointers;

  return (
    <div className={styles.arrayContainer}>
      <ul className={`${styles.array}`}>
        {arr.map((value, index) => (
          <li
            key={`pointer${index}`}
            className={`${styles.noCell} ${styles.pointer}`}
          >
            {pointers.map(
              (pointer, i) =>
                pointer === index && (
                  <p key={`pointer${index}${i}`}>
                    {pointers[0] === pointers[1] && i === 0
                      ? `p${i + 1},`
                      : `p${i + 1}`}
                  </p>
                )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrawIndicies({ title, arr }) {
  return (
    <div className={styles.arrayContainer}>
      <ul className={`${styles.array}`}>
        {arr.map((value, index) => (
          <li key={`${title}${index}`} className={`${styles.noCell} `}>
            {index}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrawArray({ arr, data }) {
  const { activeStep } = useContext(CardContext);
  const pointers = data[activeStep].pointers;

  return (
    <div className={styles.arrayContainer}>
      <ul className={`${styles.array}`}>
        {arr.map((value, index) => (
          <li
            key={`arr${index}`}
            className={`${styles.cell} ${
              pointers.includes(index) ? styles.active : ""
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CircleNext() {
  const { handleNextStep } = useContext(CardContext);
  return (
    <button
      onClick={handleNextStep}
      className={`${styles.circle} ${styles.circleNext}`}
    >
      <ArrowRightIcon className={styles.icon} />
    </button>
  );
}

function CirclePrevious() {
  const { handlePreviousStep } = useContext(CardContext);
  return (
    <button
      onClick={handlePreviousStep}
      className={`${styles.circle} ${styles.circlePrevious}`}
    >
      <ArrowLeftIcon className={styles.icon} />
    </button>
  );
}

function DrawResult({ arr, data }) {
  const { activeStep } = useContext(CardContext);
  const activeStepResults = data[activeStep].result;
  const results = [];

  for (let i = 0; i < arr.length; i++) {
    results.push("");
  }

  for (let i = 0; i < activeStepResults.length; i++) {
    results[i] = activeStepResults[i];
  }

  return (
    <>
      <p>Result</p>
      <ul className={styles.resultContainer}>
        {results.map((value, index) => (
          <li key={`result${index}`} className={styles.resultElement}>
            {value}
          </li>
        ))}
      </ul>
    </>
  );
}

ArrayCard.Head = Head;
ArrayCard.CircleNext = CircleNext;
ArrayCard.CirclePrevious = CirclePrevious;
ArrayCard.Body = Body;
ArrayCard.DrawArray = DrawArray;
ArrayCard.DrawIndicies = DrawIndicies;
ArrayCard.DrawPointers = DrawPointers;
ArrayCard.DrawResult = DrawResult;

export default ArrayCard;
