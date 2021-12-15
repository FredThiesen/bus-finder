import axios from 'axios';
import {BusLineProps} from '../interfaces/busLineProps';
const url =
  'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o';

export const fetchBusLines = async () => {
  const response = await axios.get<BusLineProps[]>(url);
  if (response.status !== 200) {
    return null;
  }
  return response!.data;
};
