import {ItineraryProps} from '../../interfaces/itineraryProps';

export const saveItineraries = (itinerary: ItineraryProps) => ({
  type: 'SAVE_ITINERARY',
  payload: itinerary,
});
