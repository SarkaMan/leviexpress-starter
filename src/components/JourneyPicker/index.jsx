import React, { useEffect, useState } from 'react';
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);

useEffect (() => {
  const fetchCities = async () => {
    const resp = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/cities")
    const data = await resp.json()
    setCities(data.results)
  }
  fetchCities ()
}, []);

  const handleChangeFromCity = (event) => {
    setFromCity(event.target.value);
  };

  const handleChangeToCity = (event) => {
    setToCity(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fromCity);
    console.log(toCity);
    console.log(date);
  };
  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select onChange={handleChangeFromCity} value={fromCity}>
            <CityOptions cities={cities} />
            </select>
          </label>
         
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select onChange={handleChangeToCity} value={toCity}>
             <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select onChange={handleChangeDate} value={date}>
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit" onClick={handleSubmit}>
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};


export const CityOptions = ({cities}) => {
  console.log(cities)
  return (
              
              <>
               <option value="">Vyberte</option>
               {cities.map((city) => (
                <option key={city.code} value={city.code}>{city.name}</option>
               ))};
              </>
            
)};
