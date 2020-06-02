import {createState} from './../store/helpers';
import {createMixdesk} from './createMixdesk';

let state;

export const createInitialState = () => {
  if (!state) {
    state = createState(createMixdesk())
  };
  return state;
}
