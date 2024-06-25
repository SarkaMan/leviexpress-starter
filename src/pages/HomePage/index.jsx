import { JourneyDetail } from '../../components/JourneyDetail';
import { JourneyPicker } from '../../components/JourneyPicker';
import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { SeatPicker } from '../../components/SeatPicker';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);
  const [userSeat, setUserSeat] = useState(null);

  const navigate = useNavigate();
  const handleJourneyChange = (journeyData) => {
    // console.log(journeyData);
    setJourney(journeyData);
    setUserSeat(journeyData.autoSeat);
  };

  const handleBuy = async () => {
    const resp = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: userSeat,
          journeyId: journey.journeyId,
        }),
      },
    );
    if (!resp.ok) {
      alert('Něco mi nefunguje');
      return;
    }
    const data = await resp.json();
    console.log('Objednáno:', data);
    const reservation = data.results;
    navigate(`/reservation/${reservation.reservationId}`);
  };
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />

      {journey && (
        <>
          <JourneyDetail journey={journey} />
          <SeatPicker
            seats={journey.seats}
            journeyId={journey.journeyId}
            selectedSeat={userSeat}
            onSeatSelected={setUserSeat}
          />
          <div className="controls container">
            <button className="btn btn--big" type="button" onClick={handleBuy}>
              Rezervovat
            </button>
          </div>
        </>
      )}
    </main>
  );
};

/* {journey && <p>Nalezeno spojeni s id {journey.journeyId}</p>} */

/* <SelectedSeat number={journey.autoSeat} /> */

// selectedSeat={journey.autoSeat}
