import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [lanSave, setLanSave] = useState();
  const [lonSave, setLonSave] = useState();
  const [temperature, setTemperature] = useState();
  const [city, setCity] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();
  const [speedWind, setSpeedWind] = useState();
  const [gustWind, setGustWind] = useState();

  const latitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const longitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const click = () => {
    setLanSave(latitude);
    setLonSave(longitude);

    setErrorMessage("");
  };

  const getWeather = async () => {
    const apiKey = "88c1c14a7092d7800c7ede095b9c6deb";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lanSave}&lon=${lonSave}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      const temperature = Math.round(response.data.main.temp - 273.15);
      const city = response.data.name;
      if (response.data.name === '') {
        setCity('на этих кординатох нет города')
      }else{
        setCity(city);
      }
      const humidity = response.data.main.humidity;
      const pressure = response.data.main.pressure;
      const speedWind = response.data.wind.speed;
      const gustWind = response.data.wind.gust;
      setTemperature(temperature);
      setHumidity(humidity);
      setPressure(pressure);
      setSpeedWind(speedWind);
      setGustWind(gustWind)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage("произошла ошибка при получении данных");
    }
  };
  useEffect(() => {
    if (lanSave && lonSave) {
      getWeather();
    }
  }, [lanSave, lonSave]);

  return (
    <div className="App">

      <div className="butin">
        <div className="inputs">
          <input
            className="inp"
            value={latitude}
            onChange={(e) => latitudeChange(e)}
            type="text"
            placeholder="веедите широту"
          ></input>
          <input
            className="inp"
            value={longitude}
            onChange={(e) => longitudeChange(e)}
            type="text"
            placeholder="введите долготу"
          ></input>
        </div>

        <button onClick={click}>старт</button>
      </div>

      <p>город: {city}</p>
      <p>температура: {temperature}</p>
      <p>давление: {humidity}</p>
      <p>влажность: {pressure}</p>
      <p>скорость ветра: {speedWind}</p>
      <p>порыв ветра: {gustWind}</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default App;
