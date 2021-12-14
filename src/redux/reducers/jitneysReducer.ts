import {JitneyProps} from '../../interfaces/jitneyProps';

export const jitneyReducer = (
  state: JitneyProps | null = null,
  action: {type: string; payload: JitneyProps},
) => {
  switch (action.type) {
    case 'SAVE_JITNEYS':
      return action.payload;
    default:
      return state;
  }
};
