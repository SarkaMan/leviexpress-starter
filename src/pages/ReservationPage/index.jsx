import { useParams } from 'react-router-dom';
import './style.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const ReservationPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const nacistData = async () => {
      const result = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${id}`,
      );
      if (!result.ok) {
        alert('Něco mi nefunguje');
        return;
      }
      const data = await result.json();
      console.log(data);
      setReservation(data.results);
    };

    nacistData();
  }, []);
  return (
    <div className="reservation container">
      <h2>Vaše e-jízdenka č. {id}</h2>

      {reservation && (
        <div className="reservation__body">
          <div className="reservation__headings">
            <p>Datum cesty:</p>
            <p>Odjezd:</p>
            <p>Příjezd:</p>
            <p>Sedadlo:</p>
          </div>
          <div className="reservation__info">
            <p>{reservation.date}</p>
            <p>
              {reservation.fromCity.name}, {reservation.fromCity.time}
            </p>
            <p>
              {reservation.toCity.name}, {reservation.toCity.time}
            </p>
            <p>{reservation.seatNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};
