import { useEffect, useState } from "react";
import ArrayCard from "./components/ArrayCard/ArrayCard.jsx";
import QuestionCard from "./components/QuestionCard/QuestionCard.jsx";

function algorithm(str) {
  let pointerOne = 0;
  let pointerTwo = 0;
  let iterations = 0;
  const pointers = [];
  const result = [];
  const data = {};
  let numbers = "0123456789";

  while (pointerTwo < str.length) {
    if (numbers.includes(str[pointerTwo])) {
      pointers.push([pointerOne, pointerTwo]);
      data[iterations] = {
        pointers: [pointerOne, pointerTwo],
        result: [...result],
      };
      pointerTwo++;
      iterations++;
    } else {
      const number = parseInt(str.slice(pointerOne, pointerTwo));
      for (let i = 0; i < number; i++) {
        result.push(str[pointerTwo]);
        pointers.push([pointerOne, pointerTwo]);
        data[iterations] = {
          pointers: [pointerOne, pointerTwo],
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

function App() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("2p1o5p2z5a");

  useEffect(() => {
    const { iterations, result, data } = algorithm(input);
    setResults({ iterations, result, data });
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{ display: "flex", gap: "3.2rem", margin: "var(--space-10)" }}
        >
          <QuestionCard></QuestionCard>
          <ArrayCard iterations={results.iterations}>
            <ArrayCard.CircleNext />
            <ArrayCard.CirclePrevious />
            <ArrayCard.Head iterations={results.iterations}></ArrayCard.Head>
            <ArrayCard.Body>
              <ArrayCard.DrawPointers arr={[...input]} data={results.data} />
              <ArrayCard.DrawArray arr={[...input]} data={results.data} />
              <ArrayCard.DrawIndicies arr={[...input]} />
              <ArrayCard.DrawResult arr={results.result} data={results.data} />
            </ArrayCard.Body>
          </ArrayCard>
        </div>
      )}
    </>
  );
}

export default App;

// function algorithm(str) {
//   let pointerOne = 0;
//   let pointerTwo = 0;
//   let iterations = 0;
//   let pointers = [];
//   let result = [];
//   let data = {};
//   let numbers = "0123456789";

//   while (pointerTwo < str.length) {
//     if (numbers.includes(str[pointerTwo])) {
//       pointers.push([pointerOne, pointerTwo]);
//       data[iterations] = {
//         pointers: [pointerOne, pointerTwo],
//         result: [...result],
//       };
//       pointerTwo++;
//       iterations++;
//     } else {
//       const number = parseInt(str.slice(pointerOne, pointerTwo));
//       for (let i = 0; i < number; i++) {
//         result.push(str[pointerTwo]);
//         pointers.push([pointerOne, pointerTwo]);
//         data[iterations] = {
//           pointers: [pointerOne, pointerTwo],
//           result: [...result],
//         };
//         iterations++;
//       }
//       pointerTwo++;
//       pointerOne = pointerTwo;
//     }
//   }

//   return (
//     <Card iterations={iterations}>
//       <Card.CircleNext />
//       <Card.CirclePrevious />
//       <Card.Head iterations={iterations}></Card.Head>
//       <Card.Body>
//         <Card.DrawPointers arr={[...str]} data={data} />
//         <Card.DrawArray arr={[...str]} data={data} />
//         <Card.DrawIndicies arr={[...str]} />
//         <Card.DrawResult arr={result} data={data} />
//       </Card.Body>
//     </Card>
//   );
// }
