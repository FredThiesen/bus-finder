import axios from 'axios';
import {ItineraryProps} from '../interfaces/itineraryProps';

export const fetchItineraries = async (id: string) => {
  let itineraries: [number, number][] = [];
  const url = `http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${id}`;
  const response = await axios.get<any>(url);
  if (response.status !== 200) {
    return null;
  }
  Object.entries(response.data).forEach(([key, value]) => {
    if (!isNaN(Number(key))) {
      //@ts-ignore
      itineraries.push([Number(value.lng), Number(value.lat)]);
    }
  });

  const formattedResponse: ItineraryProps = {
    lineId: response.data.idlinha,
    name: response.data.nome,
    code: response.data.codigo,
    coords: itineraries,
  };
  return formattedResponse;
};
