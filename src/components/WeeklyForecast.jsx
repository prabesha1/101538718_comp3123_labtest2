import React from 'react';

function WeeklyForecast({ data }) {
  if (!data || !data.list) return null;

  // Group forecast by day (get one forecast per day at noon)
  const getDailyForecasts = () => {
    const dailyData = {};

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      // Get the forecast closest to noon (12:00)
      if (!dailyData[dayKey] || item.dt_txt.includes('12:00:00')) {
        dailyData[dayKey] = item;
      }
    });

    // Return first 5 days
    return Object.values(dailyData).slice(0, 5);
  };

  const forecasts = getDailyForecasts();

  return (
    <div className="weekly-forecast">
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
  );
}

export default WeeklyForecast;

