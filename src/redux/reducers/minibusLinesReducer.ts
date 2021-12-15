import {MinibusLineProps} from '../../interfaces/minibusLineProps';

export const minibusLinesReducer = (
  state: MinibusLineProps[] | null = null,
  action: {type: string; payload: MinibusLineProps[]},
) => {
  switch (action.type) {
    case 'SAVE_MINIBUS_LINES':
      return action.payload;
    default:
      return state;
  }
};
