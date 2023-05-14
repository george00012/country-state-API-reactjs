import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error de obtener datos", error);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    setSelectedCountry(selectedCountryName);

    const selectedCountryInfo = data.find(
      (item) => item.name.common === selectedCountryName
    );

    setCountryInfo(selectedCountryInfo);
  };

  return (
    <div className="App">
      <h1>Country & State and more</h1>

      <select
        className="seleccionar"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option className="opciones" value="">
          Seleccione un pais{" "}
        </option>
        {data.map((item, index) => (
          <option className="elegir" key={index} value={item.name.common}>
            {item.name.common}
          </option>
        ))}
      </select>

      {countryInfo && (
        <div className="country-info">
          <h2>{countryInfo.name.common}</h2>
          <h3 className="reino">
            <strong>Reino: </strong>
            {countryInfo.name.official}
          </h3>
          <img src={countryInfo.flags.png} alt="Flag" />

          <p>
            <strong>Capital:</strong> {countryInfo.capital}
          </p>
          <p>
            <strong>Moneda:</strong>{" "}
            {Object.values(countryInfo.currencies)[0].name}
          </p>
          <p>
            <strong>Región:</strong> {countryInfo.region}
          </p>
          <p>
            <strong>Lenguas:</strong>{" "}
            {Object.values(countryInfo.languages).join(", ")}
          </p>
          <p>
            <strong>Poblacion:</strong>{" "}
            {countryInfo.population.toLocaleString()} millones
          </p>
          <p>
            <strong>Zona horaria:</strong> {countryInfo.timezones}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
