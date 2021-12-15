import {MinibusLines} from '../../interfaces/minibusLineProps';

export const minibusLinesReducer = (
  state: MinibusLines[] = [],
  action: {type: string; payload: MinibusLines[]},
) => {
  switch (action.type) {
    case 'SAVE_JITNEYS':
      return action.payload;
    default:
      return state;
  }
};
