import { useState } from "react";

const Button = ({ label, onButtonClick }) => (
  <button onClick={onButtonClick}>{label}</button>
);

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalSubmissions = good + neutral + bad;

  const submissionsAverage = totalSubmissions
    ? (good - bad) / totalSubmissions
    : "No feedback provided yet";

  const positiveSubmissionsAverage = totalSubmissions
    ? good / totalSubmissions
    : "No feedback provided yet";

  const renderStatistics = () => {
    if (!totalSubmissions) {
      return <p>No feedback given</p>;
    }

    return (
      <table>
        <tbody>
          <StatisticLine label="Good" value={good} />
          <StatisticLine label="Neutral" value={neutral} />
          <StatisticLine label="Bad" value={bad} />
          <StatisticLine label="All" value={totalSubmissions} />
          <StatisticLine label="Average" value={submissionsAverage} />
          <StatisticLine label="Positive" value={positiveSubmissionsAverage} />
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h2>Statistics</h2>
      {renderStatistics()}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (setState) => () => {
    setState((prev) => prev + 1);
  };

  const renderStatistics = () => {
    if (!good && !neutral && !neutral) {
      return <p>No feedback given</p>;
    }
  };

  return (
    <>
      <header>
        <h1>Give feedback</h1>
      </header>
      <main>
        <Button label="Good" onButtonClick={handleButtonClick(setGood)} />
        <Button label="Neutral" onButtonClick={handleButtonClick(setNeutral)} />
        <Button label="Bad" onButtonClick={handleButtonClick(setBad)} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </main>
    </>
  );
};

export default App;
