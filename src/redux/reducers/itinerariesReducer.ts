import {ItineraryProps} from '../../interfaces/itineraryProps';

export const itinerariesReducer = (
  state: ItineraryProps | null = null,
  action: {type: string; payload: ItineraryProps},
) => {
  switch (action.type) {
    case 'SAVE_ITINERARY':
      return action.payload;
    default:
      return state;
  }
};
