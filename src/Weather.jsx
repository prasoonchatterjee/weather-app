import { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [searchCity, setSearchCity] = useState('');
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setWeatherCondition(null);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=c09f1152c3d440e4a8944722242502&q=${searchCity}&aqi=no`
      );
      const current = response.data.current;
      const location = response.data.location;
      const weatherObj = {
        temp: current.temp_c,
        humidity: current.humidity,
        wind: current.wind_kph,
        condition: current.condition.text,
        name: location.name,
        region: location.region,
        country: location.country,
      };
      setWeatherCondition(weatherObj);
      setError(null);
      setSearchCity('');
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div id="main">
        <p>Loading....</p>
      </div>
    );
  }
  if (error) {
    return (
      <div id="main">
        <form onSubmit={handleSearch}>
          <input
            placeholder={'Enter city name'}
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{ padding: '10px' }}
          />
          <button onClick={handleSearch} type='submit'>
            Search
          </button>
        </form>
        <p>Something went wrong please search again.</p>
      </div>
    );
  }
  if (weatherCondition) {
    const { temp, humidity, wind, condition, name, region, country } =
      weatherCondition;
    return (
      <div id="main">
        <form onSubmit={handleSearch}>
          <input
            placeholder={'Enter city name'}
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{ padding: '10px' }}
          />
          <button onClick={handleSearch} type='submit'>
            Search
          </button>
        </form>
        <p>Temp:{temp} &deg;C</p>
        <p>Humidity:{humidity}</p>
        <p>Wind:{wind}kmph</p>
        <p>Condition:{condition}</p>
        <p>City Name:{name}</p>
        <p>Region:{region}</p>
        <p>Country:{country}</p>
      </div>
    );
  }
  return (
    <div id="main">
      <form onSubmit={handleSearch}>
        <input
          placeholder={'Enter city name'}
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{ padding: '10px' }}
        />
        <button onClick={handleSearch} type='submit'>
          Search
        </button>
      </form>
    </div>
  );
};

export default Weather;
