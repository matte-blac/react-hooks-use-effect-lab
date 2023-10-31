import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  let timer = null

  // add useEffect code
  useEffect(() => {
    // set a timeout to run a callback function after 1s
    timer = setTimeout(() =>{
      // if there's still time remaining, decrease it by 1s
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1)
      } else {
        // if no time is remaining, reset the timer and call onAnswered with false
        setTimeRemaining(10)
        onAnswered(false)
      }
    }, 1000)

    // cleanup function: clear the timeout when the component unmounts or before starting a new timeout
    return () => clearTimeout(timer)
  }, [timeRemaining, onAnswered]) // dependencies: re-run the useEffect when these values change

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
