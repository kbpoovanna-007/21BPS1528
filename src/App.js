import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://two1bps1528-backend-1.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    selectedOptions.forEach(option => {
      filteredResponse[option.value] = response[option.value];
    });

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select fields to display"
          />
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;