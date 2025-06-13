// Import React and necessary huuks

import React, { useState, useEffect } from 'react';

// This component receives a "country" object as a prop and displays its info
  const CountryInfo = ({ country }) => {
  // Local state to store the weather data for the country's capital
  const [weather, setWeather] = useState(null);

  // Get the name of the capital city from the country object
  // Some countries may have no capital, so we use a fallback (empty string)

  const capital = country.capital ? country.capital[0] : '';

  // Get the OpenWeatherMap API key from the environment variables (Vite-style)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // useEffect will run when the component is mounted and when 'capital' or 'apiKey' changes
  useEffect(() => {
    // If there's no capital, there's nothing to fetch — return early
    if (!capital) return;

    // Build the API URL using the capital city name and API key
    // `units=metric` ensures temperatures are in Celsius
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

    // Fetch the weather data from the OpenWeatherMap API
    fetch(weatherApiUrl)
      .then(response => {
        // If the response is not OK (e.g., city not found), throw an error
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        return response.json(); // Convert the response to JSON
      })
      .then(data => {
        // If successful, save the weather data into state
        setWeather(data);
      })
      .catch(error => {
        // If there's any error (network issue, API error), show it in the console
        console.error('Error fetching weather data:', error);
        setWeather(null); // Clear weather data so it doesn't show wrong info
      });
  }, [capital, apiKey]); // This effect runs again if capital or apiKey changes

  // Return JSX to display the country info
  return (
    <div>
      {/* Country name */}
      <h2>{country.name.common}</h2>

      {/* Capital and area */}
      <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
      <p><strong>Area:</strong> {country.area} km²</p>

      {/* Languages list */}
      <h3>Languages:</h3>
      <ul>
        {/* If languages exist, map over them and create a list item for each */}
        {country.languages
          ? Object.values(country.languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))
          : <li>No languages listed</li>}
      </ul>

      {/* Flag image */}
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="153"
        style={{ border: '2px solid black' }} 
      />

      {/* Weather information section */}
      <h3>Weather in {capital}</h3>

      {/* Check if weather data has been successfully loaded */}
      {weather ? (
        <div>
          {/* Show temperature */}
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>

          {/* Optional: show weather description (uncomment if needed) */}
          {/* <p><strong>Conditions:</strong> {weather.weather[0].description}</p> */}

          {/* Weather icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          {/* Wind speed in m/s and km/h (converted) */}
          <p><strong>Wind:</strong> {weather.wind.speed} m/s ({(weather.wind.speed * 3.6).toFixed(1)} km/h)</p>
        </div>
      ) : capital ? (
        // If we are still waiting for weather data, or an error happened
        <p>Loading weather data...</p>
      ) : (
        // If the country has no capital, show a fallback message
        <p>No capital city available for weather data.</p>
      )}
    </div>
  );
};

// Export the component so it can be used
export default CountryInfo;


