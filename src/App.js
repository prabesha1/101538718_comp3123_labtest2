import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '4ea4fe65e25be4de2fc6fbee6e730add';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(weatherData.message || 'City not found');
      }

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Toronto');
  }, []);

  return (
    <div className="App">
      <div className="main-content">
        <div className="container">
          <h1 className="app-title">Weather App</h1>
          {city && <p className="current-city">Currently showing: {city}</p>}
          <SearchBar onSearch={fetchWeather} />

          {loading && <p className="loading">Loading...</p>}
          {error && (
            <div className="error">
              <p><strong>Error:</strong> {error}</p>
              {error.includes('Invalid API key') && (
                <div className="error-help">
                  <p>Check: <a href="https://home.openweathermap.org/api_keys" target="_blank" rel="noopener noreferrer">API Keys Dashboard</a></p>
                </div>
              )}
            </div>
          )}
          {weatherData && !loading && <WeatherCard city={city} data={weatherData} forecastData={forecastData} />}
        </div>
      </div>

      <footer className="app-footer">
        <p className="student-name">Prabesh Shrestha</p>
        <p className="student-id">101538718</p>
      </footer>
    </div>
  );
}

export default App;
