import { useState } from "react";

const Anecdote = ({ anecdote, vote }) => (
  <>
    <p>{anecdote}</p>
    <p>has {vote} votes</p>
  </>
);

const AnecdoteOfTheDay = ({ title, anecdote, vote }) => {
  return (
    <>
      <h2>{title}</h2>
      <Anecdote anecdote={anecdote} vote={vote} />
    </>
  );
};

const Button = ({ label, onButtonClick }) => (
  <button onClick={onButtonClick}>{label}</button>
);

const AnecdotesWithMostVotes = ({ mostVotedAnecdotes, maxVotes }) => {
  const renderAnecdotesWithMostVotes = () => {
    if (maxVotes) {
      return (
        <ul>
          {mostVotedAnecdotes.map((anecdote) => (
            <li key={anecdote}>
              <Anecdote anecdote={anecdote} vote={maxVotes} />
            </li>
          ))}
        </ul>
      );
    }

    return <p>No votes submitted yet.</p>;
  };

  return (
    <>
      <h2>Anecdotes with most votes</h2>
      {renderAnecdotesWithMostVotes()}
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const generateNumber = () => Math.floor(Math.random() * anecdotes.length);

  const initialVotes = Array.from({ length: anecdotes.length }, () => 0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleVoteButtonClick = () =>
    setVotes((previousVotes) => {
      const newVotes = [...previousVotes];
      newVotes[selected] += 1;

      return newVotes;
    });

  const handleNextButtonClick = () => {
    setSelected(generateNumber());
  };

  const getAnecdotesWithMaxVotes = () => {
    const maxVotes = Math.max(...votes);

    const indexesOfMostVotedAnecdotes = [];

    votes.forEach((vote, index) => {
      if (vote === maxVotes) {
        indexesOfMostVotedAnecdotes.push(index);
      }
    });

    const mostVotedAnecdotes = anecdotes.filter((anecdote, index) => {
      if (indexesOfMostVotedAnecdotes.includes(index)) {
        return anecdote;
      }
    });

    return {
      mostVotedAnecdotes,
      maxVotes,
    };
  };

  const { mostVotedAnecdotes, maxVotes } = getAnecdotesWithMaxVotes();

  return (
    <main>
      <h1>Anecdotes</h1>
      <AnecdoteOfTheDay
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        vote={votes[selected]}
      />
      <Button label="Vote" onButtonClick={handleVoteButtonClick} />
      <Button label="Next anecdote" onButtonClick={handleNextButtonClick} />
      <AnecdotesWithMostVotes
        mostVotedAnecdotes={mostVotedAnecdotes}
        maxVotes={maxVotes}
      />
    </main>
  );
};

export default App;
