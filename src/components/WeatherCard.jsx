function WeatherCard({ city, data, forecastData }) {
  const { main, weather, wind, sys } = data;

  const description = weather[0]?.description;
  const mainCondition = weather[0]?.main;
  const iconCode = weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const getDailyForecasts = () => {
    if (!forecastData || !forecastData.list) return [];

    const dailyData = {};

    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      if (!dailyData[dayKey] || item.dt_txt.includes('12:00:00')) {
        dailyData[dayKey] = item;
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const forecasts = getDailyForecasts();

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

      {forecasts.length > 0 && (
        <div className="forecast-section">
          <h3 className="forecast-title">5-Day Forecast</h3>
          <div className="forecast-grid">
            {forecasts.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

              return (
                <div key={index} className="forecast-item">
                  <p className="forecast-day">{dayName}</p>
                  <p className="forecast-date">{dateStr}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                    className="forecast-icon"
                  />
                  <p className="forecast-temp">{Math.round(forecast.main.temp)}°C</p>
                  <p className="forecast-desc">{forecast.weather[0].main}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;

