function WeatherCard({ city, data }) {
  const { main, weather, wind, sys } = data;

  const description = weather[0]?.description;
  const mainCondition = weather[0]?.main;
  const iconCode = weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>
          {city}, {sys?.country}
        </h2>
        <p className="condition-main">{mainCondition}</p>
        <p className="condition-description">{description}</p>
      </div>

      <div className="weather-main">
        <div className="details">
          <p>Feels like: {Math.round(main.feels_like)}°C</p>
          <p>Min: {Math.round(main.temp_min)}°C</p>
          <p>Max: {Math.round(main.temp_max)}°C</p>
        </div>
        <div className="temp-block">
          <img src={iconUrl} alt={description} />
          <p className="temp">{Math.round(main.temp)}°C</p>
        </div>
        <div className="weather-extra">
          <p>Humidity: {main.humidity}%</p>
          <p>Pressure: {main.pressure} hPa</p>
          <p>Wind: {wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

