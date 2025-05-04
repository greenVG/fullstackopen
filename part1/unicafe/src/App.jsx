// Import useState hook from React to manage local state

import { useState } from 'react';

// Button component - Responsible for each feedback button

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

// StatisticLine component - Displays a single statistic as a table row

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Statistics component - Displays statistics in a table

const Statistics = ({ good, neutral, bad }) => {

  // Calculate total number of feedbacks
  const totalFeedback = good + neutral + bad;

  // Calculate average score
  const averageScore = totalFeedback > 0 ? (good * 1 + neutral * 0 + bad * -1) / totalFeedback : 0;

  // Calculate percentage of positive feedback
  const positivePercentage = totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  // If there is no feedback, display a message
  if (totalFeedback === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  // Display statistics using a table

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalFeedback} />
          <StatisticLine text="average score" value={averageScore.toFixed(1)} />
          <StatisticLine text="positive feedback percentage" value={positivePercentage.toFixed(1) + '%'} />
        </tbody>
      </table>
    </div>
  );
};

// App component - state of feedback and handles button clicks

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  // Event handlers for feedback buttons
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

