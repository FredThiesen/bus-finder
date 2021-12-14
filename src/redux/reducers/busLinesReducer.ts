import {BusLineProps} from '../../interfaces/busLineProps';

export const busLinesReducer = (
  state: BusLineProps[] = [],
  action: {type: string; payload: BusLineProps[]},
) => {
  switch (action.type) {
    case 'SAVE_BUS_LINES':
      return action.payload;
    default:
      return state;
  }
};
