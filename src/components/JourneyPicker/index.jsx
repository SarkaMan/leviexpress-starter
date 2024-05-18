import React, { useEffect, useState } from 'react';
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await resp.json();
      setCities(data.results);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data = await resp.json();
      setDates(data.results);
    };
    fetchDates();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(fromCity);
    // console.log(toCity);
    // console.log(date);

    const resp = await fetch(
      `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
    );
    const journeyData = await resp.json();
    onJourneyChange(journeyData.results);
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
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              disabled={fromCity === '' || toCity === '' || date === ''}
              className="btn"
              type="submit"
              onClick={handleSubmit}
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};

export const CityOptions = ({ cities }) => {
  console.log(cities);
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
      ;
    </>
  );
};

export const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
      ;
    </>
  );
};
