import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Home() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const initialRender = useRef(false);
  const inputRef = useRef();
  const [error, setError] = useState(false)

  useEffect(() => {
    inputRef.current.focus();
    if (initialRender.current) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=80b8381104b294122fb9f95aa452e639`
        )
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setWeatherData(res.data);
          setError(false)
        })
        .catch((e) => {
          console.log(e);
          setWeatherData({});
          setError(true)
        });
    } else {
      initialRender.current = true;
    }
  }, [location]);

  const submitHandler = (event) => {
    event.preventDefault();
    setLocation(city);
    setCity("");
  };

  return (
    <>
      <form onSubmit={submitHandler} className="form">
        <input
          className="search"
          type="text"
          placeholder="Enter location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">get weather</button>
      </form>


      <div className="container">
        {weatherData.main && (
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              <h1>{weatherData.main.temp}&#8457;</h1>
            </div>
            <div className="description">
              <p>{weatherData.weather[0].main}</p>
            </div>
          </div>
        )}

        {weatherData.main && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{weatherData.main.feels_like}&#8457;</p>
              <p>Feels like</p>
            </div>

            <div className="humidity">
              <p className="bold">{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            
            <div className="wind">
              <p className="bold">{weatherData.wind.speed}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}

      {error && <h2 className="error">Invalid location</h2>}
      </div>

    </>
  );
}

export default Home;
