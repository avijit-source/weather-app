import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchInput from './components/SearchInput';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState()
  const [hourlyForecast, setHourlyForecast] = useState()



  return (
    <div className="app d-flex flex-column align-items-center mb-2">
      <SearchInput setWeatherData={setWeatherData} setHourlyForecast={setHourlyForecast} />
      {weatherData && (<WeatherDetails weatherData={weatherData} />)}
      {hourlyForecast && (<HourlyForecast hourlyForecast={hourlyForecast} />)}
    </div>
  );
}

export default App;
