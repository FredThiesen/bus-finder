import {JitneyProps} from '../../interfaces/jitneyProps';

export const jitneysReducer = (
  state: JitneyProps[] = [],
  action: {type: string; payload: JitneyProps[]},
) => {
  switch (action.type) {
    case 'SAVE_JITNEYS':
      return action.payload;
    default:
      return state;
  }
};
