import {MinibusLines} from '../../interfaces/minibusLineProps';

export const saveJitneys = (jitneys: MinibusLines[]) => ({
  type: 'SAVE_JITNEYS',
  payload: jitneys,
});
