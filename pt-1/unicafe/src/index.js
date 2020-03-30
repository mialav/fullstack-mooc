import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Stat = ({ text, amount }) => {
  return (
    <p>
      {" "}
      {text} {amount}
    </p>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = good * 1 + neutral * 0 + (bad * -1) / total;
  const positives = good / total;

  // console.log("good ", good);
  // console.log("neutral ", neutral);
  // console.log("bad ", bad);

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Stat text="good" amount={good} />
      <Stat text="neutral" amount={neutral} />
      <Stat text="bad" amount={bad} />
      <Stat text="all" amount={total} />
      <Stat text="average" amount={average ? average : 0} />
      <Stat text="positive" amount={positives ? positives * 100 + "%" : "-"} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
