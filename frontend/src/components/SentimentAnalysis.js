import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addSearchHistory } from '../store/sentimentSlice';
import { FaMicrophone } from 'react-icons/fa';
import Dashboard from './Dashboard';

/**
 * Runs the tone analysis.
 * 
 * @param {string} text - The text to be analyzed.
 * @param {Function} setResult - Function to set the result state.
 * @param {Function} dispatch - Redux dispatch function.
 */
const run = async (text, setResult, dispatch) => {
  try {
    const response = await axios.post(
      'https://api.sapling.ai/api/v1/tone',
      {
        key: 'AU0SIHYDOYZ1CS7ZE8F0QPJAAPZKIXC2',
        text,
      }
    );
    const { status, data } = response;
    console.log({ status });
    console.log(JSON.stringify(data, null, 4));
    setResult(data);
    dispatch(addSearchHistory({ text, result: data }));
  } catch (err) {
    const { msg } = err.response.data;
    console.log({ err: msg });
  }
};

/**
 * SentimentAnalysis component handles text input and displays the tone analysis result.
 * 
 * @component
 */
const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  /**
   * Handles form submission for sentiment analysis.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await run(text, setResult, dispatch);
    setText(''); // Clear the input box after submission
  };

  /**
   * Formats the result for display.
   * 
   * @param {Object} result - The result object from the tone analysis.
   * @returns {JSX.Element|null} - The formatted result.
   */
  const formatResult = (result) => {
    if (!result) return null;
    const overall = result.overall.map(([percentage, feeling, emoji]) => ({
      feeling,
      emoji,
      percentage: (percentage * 100).toFixed(2),
    }));

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded shadow-md w-full">
        <h3 className="text-xl mb-2 font-semibold">Analysis Result:</h3>
        <p className="text-lg mb-2"><strong>User Input:</strong> {result.sents[0]}</p>
        {overall.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center mb-1">
              <span className="mr-2">{item.emoji}</span>
              <span>{item.feeling}</span>
            </div>
            <div className="relative h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-purple-600"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <Dashboard />
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl mb-4 font-semibold">Tone Analysis</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block w-full mb-4 p-2 border rounded h-32"
            placeholder="Enter text here"
          ></textarea>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded">Submit</button>
            <button type="button" className="ml-4 bg-purple-600 text-white p-2 rounded-full">
              <FaMicrophone />
            </button>
          </div>
          {formatResult(result)}
        </form>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
