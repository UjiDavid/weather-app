import { CircularProgress, Slide, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [error, setError] = useState(false);
  const [location, setLocation] = useState(false);

  const onSucess = (location) => {
    setLat(location.coords.latitude);
    setLon(location.coords.longitude);
    setLocation(true);
  };

  const onError = (error) => {
    setError(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition();
    } else {
      alert('Geolocation not available');
    }
    location && getWeather(lat, lon);
  }, [location]);

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(onSucess, onError);
  };
  // 9.1524828 7.3452945
  const getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=176695ad191f6508f926920fe5af6cf1`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg_img">
      {!loading ? (
        <>
          <h1 className="city">{data.name}</h1>
          <div className="group">
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
            <h1>{data.weather[0].main}</h1>
          </div>

          <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

          <Slide direction="right" timeout={800} in={!loading}>
            <div className="box_container">
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="box">
                <p>Feels Like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
          </Slide>
        </>
      ) : (
        <div className="container">
          <div className="cloud front">
            <span className="left-front"></span>
            <span className="right-front"></span>
          </div>
          <span className="sun sunshine"></span>
          <span className="sun"></span>
          <div className="cloud back">
            <span className="left-back"></span>
            <span className="right-back"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
