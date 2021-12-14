import {JitneyProps} from '../../interfaces/jitneyProps';

export const saveJitneys = (jitneys: JitneyProps[]) => ({
  type: 'SAVE_JITNEYS',
  payload: jitneys,
});
