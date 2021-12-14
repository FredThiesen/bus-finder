import {BusLineProps} from '../../interfaces/busLineProps';

export const saveBusLines = (busLines: BusLineProps[]) => ({
  type: 'SAVE_BUS_LINES',
  payload: busLines,
});
