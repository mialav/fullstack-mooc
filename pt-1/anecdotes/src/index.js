import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anectodes, selected, points }) => {
  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {points[selected]} points
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1)
      .join("0")
      .split("")
      .map(parseFloat)
  );
  const randomAnecdote = () => Math.floor(Math.random() * anecdotes.length);
  const mostPoints = () => Math.max([...points]);
  console.log(mostPoints);

  const vote = selected => {
    const pointsCopy = [...points];

    pointsCopy[selected] += 1;

    setPoints(pointsCopy);
  };

  console.log(points);

  return (
    <div>
      <Anecdote anectodes={anecdotes} selected={selected} points={points} />
      <Button
        text="next anecdote"
        handleClick={() => {
          setSelected(randomAnecdote());
        }}
      />
      <br />

      <Button
        text="vote"
        handleClick={() => {
          vote(selected);
        }}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
