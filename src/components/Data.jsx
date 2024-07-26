import React, { useState, useEffect } from "react";
import "./Data.css";

const Data = () => {
  const KEY = "5f8503fb89ffdb650735ce3ffd36d138";
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Toshkent");
  const [timeoutId, setTimeoutId] = useState(null);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Iltimos, shahar nomini kiriting.");
      return;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
    try {
      const res = await fetch(URL);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError("Shahar yoki tuman topilmadi.");
        setWeather(null);
      }
    } catch (error) {
      console.error("Ob-havo ma'lumotlarini olishda xato yuz berdi:", error);
      setError("Ma'lumot olishda xato yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
      setWeather(null);
    }
  };

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    getWeather();

    const id = setTimeout(getWeather, 100000);
    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, [city]);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="fonemagee">
      <div className="container">
        <div className="inputname">
          <div className="group">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              className="input"
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Shahar nomini kiriting"
            />
            <button onClick={getWeather} className="btn">Qidirish</button>
          </div>

          {error && <p className="error">{error}</p>}

          {weather && (
            <h1 className="temp">
              <span>Sana:</span> {currentDate}
              <br />
              <span>Shahar:</span> {weather.name}
              <br />
              <span className="spane">Temperatura: <img className="img_quyos" src="https://pogoda.uz/images/icons/clear.png" alt="" /></span> {Math.round(weather.main.temp)}{" "}
              <sup>o</sup>C<br />
              <span>Shamol tezligi:</span> {weather.wind.speed} m/s
              <br />
              <span>Namlik:</span> {weather.main.humidity} %<br />
              <span>Bosim:</span> {weather.main.pressure} hPa
              <br />
              <span>Holat:</span> {weather.weather[0].description}
              <br />
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;
