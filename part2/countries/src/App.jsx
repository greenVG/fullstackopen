// Import React and the necessary hooks

import React, { useState, useEffect } from 'react';

// Import the component that displays detailed info about a country

import CountryInfo from './components/CountryInfo';

// Main App component

const App = () => {
  // State for the search input value
  const [query, setQuery] = useState('');

  // State to store all countries fetched from the API
  const [countries, setCountries] = useState([]);

  // State to store the country selected when clicking "Show"
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch the list of all countries once when the app loads
  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json()) // Convert the response to JSON
      .then(data => setCountries(data))  // Save the countries into state
      .catch(err => console.error('Failed to fetch countries', err)); // Handle errors
  }, []); // Empty dependency array = run only once

  // Handle changes in the input field
  const handleInputChange = (e) => {
    setQuery(e.target.value);       // Update the input value
    setSelectedCountry(null);       // Reset selected country if previously shown
  };

  // Filter countries based on what's typed in the input
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  // Handle the "Show" button click
  const handleShowClick = (country) => {
    setSelectedCountry(country); // Save the clicked country as selected
  };

  // Return the UI of the app
  return (
    <div style={{ padding: '20px' }}>
      <h1>Country Finder</h1>

      {/* Input field for user to search countries */}
      <div style={{ marginBottom: '20px' }}>
        Find countries: <input value={query} onChange={handleInputChange} />
      </div>

      {/* Display results based on conditions */}
      <div>
        {selectedCountry ? (
          // If a country is selected (after clicking "Show"), display it
          <CountryInfo country={selectedCountry} />
        ) : query === '' ? (
          // If nothing has been typed yet
          <p>Type a country name to search.</p>
        ) : filteredCountries.length > 10 ? (
          // If too many results, ask the user to be more specific
          <p>Too many matches, please specify another filter.</p>
        ) : filteredCountries.length === 0 ? (
          // If no countries match the search
          <p>No matches found.</p>
        ) : filteredCountries.length === 1 ? (
          // If exactly one country matches, show it directly
          <CountryInfo country={filteredCountries[0]} />
        ) : (
          // Otherwise, show a list of matching countries with "Show" buttons
          filteredCountries.map(country => (
            <div key={country.cca3} style={{ marginBottom: '10px' }}>
              {country.name.common}{' '}
              <button onClick={() => handleShowClick(country)}>Show</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Export the App component so it can be used in other files
export default App;

