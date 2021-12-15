import {MinibusLineProps} from '../../interfaces/minibusLineProps';

export const saveMinibusLines = (minibusLines: MinibusLineProps[]) => ({
  type: 'SAVE_MINIBUS_LINES',
  payload: minibusLines,
});
