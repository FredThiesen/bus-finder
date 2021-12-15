import {BusLineProps} from './busLineProps';
import {ItineraryProps} from './itineraryProps';
import {MinibusLineProps} from './minibusLineProps';

export interface Store {
  busLines: BusLineProps[] | null;
  minibusLines: MinibusLineProps[] | null;
  initeraries: ItineraryProps | null;
}
