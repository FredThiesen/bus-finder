import axios from 'axios';
import {ItineraryProps} from '../interfaces/itineraryProps';

export const fetchItineraries = async (id: string) => {
  let errorMessage: string | null = null;
  let itineraries: ItineraryProps[] = [];
  const url = `http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${id}`;
  const response = await axios.get<ItineraryProps[]>(url);
  if (response.status !== 200) {
    return null;
  }
  Object.entries(response.data).forEach(([key, value]) => {
    if (!isNaN(Number(key))) {
      itineraries.push(value);
    }
  });

  console.log(itineraries);
  return itineraries;
};
