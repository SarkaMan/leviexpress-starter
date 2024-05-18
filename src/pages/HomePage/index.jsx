import { JourneyDetail } from '../../components/JourneyDetail';
import { JourneyPicker } from '../../components/JourneyPicker';
import { useState } from 'react';
export const HomePage = () => {
  const [journey, setJourney] = useState(null);
  const handleJourneyChange = (journeyData) => {
    // console.log(journeyData);
    setJourney(journeyData);
  };
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {/* {journey && <p>Nalezeno spojeni s id {journey.journeyId}</p>} */}
       {journey && <JourneyDetail />} 
       
    </main>
  );
};
