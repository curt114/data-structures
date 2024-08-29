import { createContext, useContext, useEffect, useState } from "react";
import styles from "./ArrayCard.module.css";
import {
  PlayIcon,
  CodeBracketIcon,
  PauseIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const CardContext = createContext();

function getModifiers(block, element, modifiers) {
  return modifiers
    .map((modifier) => styles[`${block}__${element}--${modifier}`])
    .join(" ");
}

function ArrayCard({ iterations, input, children }) {
  const [activeStep, setActiveStep] = useState(0);
  const [videoMode, setVideoMode] = useState(true);

  useEffect(() => {
    setActiveStep(0);
  }, [input]);

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
      <div className={styles.arrayCard}>{children}</div>
    </CardContext.Provider>
  );
}

function Header({ iterations }) {
  const { activeStep } = useContext(CardContext);
  const buttonModifiers = ["circle", "primary"];
  const buttonClasses = getModifiers("arrayCard", "button", buttonModifiers);
  const iconClasses = styles["arrayCard__icon--sm"];

  return (
    <div className={styles.arrayCard__header}>
      <h4 className={styles.arrayCard__h4}>
        Iteration {activeStep + 1}/{iterations}
      </h4>
      <button className={`${styles.arrayCard__button} ${buttonClasses}`}>
        <CodeBracketIcon className={iconClasses} />
      </button>
    </div>
  );
}

function Body({ children }) {
  return <div className={styles.arrayCard__body}>{children}</div>;
}

function DrawArray({
  label,
  arrName,
  arr,
  indicies,
  data,
  addPointer = false,
  showPointers = true,
  showValues = true,
  showIndicies = true,
}) {
  const { activeStep } = useContext(CardContext);
  const pointers = data[activeStep][`${arrName}Pointers`];

  function drawPointers(label, indicies, arr, pointers) {
    const modifiers = ["size-md", "align-items-end"];
    const itemClasses = getModifiers("arrayCard", "item", modifiers);

    return (
      <ul className={`${styles.arrayCard__list}`}>
        {Array.from({ length: indicies }, (_, index) => (
          <li
            key={`pointer${index}`}
            className={`${styles.arrayCard__item} ${itemClasses} ${
              index === arr.length &&
              styles["arrayCard__item--position-top-right"]
            }`}
          >
            {pointers.map(
              (pointer, i) =>
                pointer === index && (
                  <p key={`${label}pointer${index}${i}`}>
                    {pointers[0] === pointers[1] && i === 0
                      ? `p${i + 1},`
                      : `p${i + 1}`}
                  </p>
                )
            )}
          </li>
        ))}
      </ul>
    );
  }

  function drawValues(label, arr, pointers) {
    const modifiers = ["size-md", "border", "color", "align-items-center"];
    const modifiersActive = [
      "size-md",
      "border",
      "color-highlighted",
      "align-items-center",
    ];
    const itemClasses = getModifiers("arrayCard", "item", modifiers);
    const itemActiveClasses = getModifiers(
      "arrayCard",
      "item",
      modifiersActive
    );

    return (
      <ul className={`${styles.arrayCard__list}`}>
        {arr.map((value, index) => (
          <li
            key={`${label}arr${index}`}
            className={`${styles.arrayCard__item} ${
              pointers.includes(index) ? itemActiveClasses : itemClasses
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
    );
  }

  function drawIndicies(label, indicies) {
    const modifiers = ["size-md", "align-items-start"];
    const itemClasses = getModifiers("arrayCard", "item", modifiers);

    return (
      <ul className={`${styles.arrayCard__list}`}>
        {indicies.map((index) => (
          <li
            key={`${label}index${index}`}
            className={`${styles.arrayCard__item} ${itemClasses}`}
          >
            {index}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className={styles.arrayCard__array}>
        {showPointers &&
          drawPointers(
            label,
            addPointer ? arr.length + 1 : arr.length,
            arr,
            pointers
          )}
        {showValues && drawValues(label, arr, pointers)}
        {showIndicies && drawIndicies(label, indicies)}
      </div>
      <div className={styles.arrayCard__title}>
        <p className={styles.arrayCard__p}>{label}</p>
      </div>
    </div>
  );
}

function DrawArrayStep({ label, arrLength, data }) {
  const { activeStep } = useContext(CardContext);
  const arr = data[activeStep].result;
  const modifiers = ["size-md", "border", "color", "align-items-center"];
  const modifiersActive = [
    "size-md",
    "border",
    "color-highlighted",
    "align-items-center",
  ];
  const itemClasses = getModifiers("arrayCard", "item", modifiers);
  const itemActiveClasses = getModifiers("arrayCard", "item", modifiersActive);

  for (let i = arr.length; i < arrLength; i++) {
    arr.push("");
  }

  return (
    <div>
      <ul className={`${styles.arrayCard__list}`}>
        {arrLength !== 0 ? (
          arr.map((value, index) => (
            <li
              key={`arrResult${index}`}
              className={`${styles.arrayCard__item} ${
                data[activeStep].resultPointers.includes(index)
                  ? itemActiveClasses
                  : itemClasses
              }`}
            >
              {value}
            </li>
          ))
        ) : (
          <li className={`${styles.arrayCard__item} ${itemClasses}`}></li>
        )}
      </ul>

      <div className={styles.arrayCard__title}>
        <p
          className={`${styles.arrayCard__p} ${styles["arrayCard__p--margin-top"]}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

{
  /* <div>
    <ul className={`${styles.arrayCard__list}`}>
      {arr.map((value, index) => (
        <li
          key={`arrResult${index}`}
          className={`${styles.arrayCard__item} ${itemClasses}`}
        >
          {value}
        </li>
      ))}
    </ul>
    <div className={styles.arrayCard__title}>
      <p
        className={`${styles.arrayCard__p} ${styles["arrayCard__p--margin-top"]}`}
      >
        {label}
      </p>
    </div>
  </div> : <div>None</div> */
}

function DrawHashMap({ label, argSetLength, data }) {
  const { activeStep } = useContext(CardContext);
  const hashMap = data[activeStep].hashMap;
  const pointers = data[activeStep].hashMapPointers;
  const indicies = Object.keys(hashMap);
  const values = Object.values(hashMap);

  const modifiers = ["size-md", "border", "color", "align-items-center"];
  const modifiersActive = [
    "size-md",
    "border",
    "color-highlighted",
    "align-items-center",
  ];
  const itemClasses = getModifiers("arrayCard", "item", modifiers);
  const itemActiveClasses = getModifiers("arrayCard", "item", modifiersActive);

  for (let i = indicies.length; i < argSetLength; i++) {
    indicies.push("");
    values.push("");
  }

  return (
    <div>
      <ul className={`${styles.arrayCard__list}`}>
        {values.map((value, index) => (
          <li
            key={`hashMapValues${index}`}
            className={`${styles.arrayCard__item} ${
              pointers.includes(index) ? itemActiveClasses : itemClasses
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
      <ul className={`${styles.arrayCard__list}`}>
        {indicies.map((value, index) => (
          <li
            key={`hashMapIndex${index}`}
            className={`${styles.arrayCard__item} ${
              pointers.includes(value) ? itemActiveClasses : itemClasses
            }`}
          >
            {value.replace(/~/g, "")}
          </li>
        ))}
      </ul>
      <div className={styles.arrayCard__title}>
        <p
          className={`${styles.arrayCard__p} ${styles["arrayCard__p--margin-top"]}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function DrawResult({ arr, data }) {
  const { activeStep } = useContext(CardContext);
  const activeStepResults = data[activeStep].result;
  const results = [];
  const listModifiers = ["wrap", "gap-sm"];
  const itemModifiers = ["size-sm", "border-bottom"];

  const listClasses = getModifiers("arrayCard", "list", listModifiers);
  const itemClasses = getModifiers("arrayCard", "item", itemModifiers);

  for (let i = 0; i < arr.length; i++) {
    results.push("");
  }

  for (let i = 0; i < activeStepResults.length; i++) {
    results[i] = activeStepResults[i];
  }

  return (
    <div>
      <ul className={`${styles.arrayCard__list} ${listClasses}`}>
        {results.map((value, index) => (
          <li
            key={`result${index}`}
            className={`${styles.arrayCard__item} ${itemClasses}`}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrawResultBoolean({ result }) {
  return (
    <div className={styles.arrayCard__title}>
      {result ? (
        <CheckCircleIcon
          className={`${styles["arrayCard__icon--lg"]} ${styles["arrayCard__icon--emerald-500"]}`}
        />
      ) : (
        <XCircleIcon
          className={`${styles["arrayCard__icon--lg"]} ${styles["arrayCard__icon--red-500"]}`}
        />
      )}
      <p>{result ? "True" : "False"}</p>
      <p className={`${styles.arrayCard__p}`}>Result</p>
    </div>
  );
}

function DrawResultString({ result }) {
  return (
    <div className={styles.arrayCard__title}>
      <p>{result}</p>
      <p className={`${styles.arrayCard__p}`}>Result</p>
    </div>
  );
}

function DrawResultArray({ result }) {
  return (
    <div className={styles.arrayCard__title}>
      <ul
        className={`${styles["arrayCard__list"]} ${styles["arrayCard__list--gap-sm"]}`}
      >
        {result.map((element, index) => (
          <li key={`arrayResult${index}`}>
            {index === 0 && `[${element},`}
            {index !== 0 && index !== result.length - 1 && `${element},`}
            {index === result.length - 1 && `${element}]`}
          </li>
        ))}
      </ul>
      <p className={`${styles.arrayCard__p}`}>Result</p>
    </div>
  );
}

function DrawVariable({ label, varName, data }) {
  const { activeStep } = useContext(CardContext);
  const variable = data[activeStep][`${varName}`];
  return (
    <div className={styles.arrayCard__title}>
      <p>{variable}</p>
      <p className={`${styles.arrayCard__p}`}>{label}</p>
    </div>
  );
}

function MediaControls() {
  const { videoMode, handlePreviousStep, handleVideoMode, handleNextStep } =
    useContext(CardContext);
  const listModifiers = ["gap-md"];
  const itemModifiers = ["color", "border-none"];
  const buttonModifiers = ["size-md", "rounded", "secondary"];
  const buttonActiveModifiers = ["size-md", "rounded", "active"];

  const listClasses = getModifiers("arrayCard", "list", listModifiers);
  const itemClasses = getModifiers("arrayCard", "item", itemModifiers);
  const buttonClasses = getModifiers("arrayCard", "button", buttonModifiers);
  const buttonActiveClasses = getModifiers(
    "arrayCard",
    "button",
    buttonActiveModifiers
  );
  const iconClasses = styles["arrayCard__icon--md"];

  return (
    <ul className={`${styles.arrayCard__list} ${listClasses}`}>
      <li className={`${styles.arrayCard__item} ${itemClasses}`}>
        <button
          className={`${styles.arrayCard__button} ${buttonClasses}`}
          onClick={handlePreviousStep}
        >
          <ChevronDoubleLeftIcon className={iconClasses} />
        </button>
      </li>

      <li className={`${styles.arrayCard__item} ${itemClasses}`}>
        {videoMode ? (
          <button
            className={`${styles.arrayCard__button} ${buttonActiveClasses}`}
            onClick={handleVideoMode}
          >
            <PauseIcon className={iconClasses} />
          </button>
        ) : (
          <button
            className={`${styles.arrayCard__button} ${buttonClasses}`}
            onClick={handleVideoMode}
          >
            <PlayIcon className={iconClasses} />
          </button>
        )}
      </li>

      <li className={`${styles.arrayCard__item} ${itemClasses}`}>
        <button
          className={`${styles.arrayCard__button} ${buttonClasses}`}
          onClick={handleNextStep}
        >
          <ChevronDoubleRightIcon className={iconClasses} />
        </button>
      </li>
    </ul>
  );
}

ArrayCard.Header = Header;
ArrayCard.Body = Body;
ArrayCard.DrawHashMap = DrawHashMap;
ArrayCard.DrawArrayStep = DrawArrayStep;
ArrayCard.DrawArray = DrawArray;
ArrayCard.DrawResult = DrawResult;
ArrayCard.DrawResultBoolean = DrawResultBoolean;
ArrayCard.DrawResultString = DrawResultString;
ArrayCard.DrawResultArray = DrawResultArray;
ArrayCard.DrawVariable = DrawVariable;
ArrayCard.MediaControls = MediaControls;

export default ArrayCard;
