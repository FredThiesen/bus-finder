import axios from 'axios';
import {MinibusLineProps} from '../interfaces/minibusLineProps';
const url =
  'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=l';

export const fetchMinibusLines = async () => {
  const response = await axios.get<MinibusLineProps[]>(url);
  if (response.status !== 200) {
    return null;
  }
  return response!.data;
};
