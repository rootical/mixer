import {Mixer} from '../models';
import {Delay, Reverb, Distortion} from '../models';

let mixdesk;

export const createMixdesk = () => {
  if (!mixdesk) {
    mixdesk = new Mixer([], [Delay, Reverb, Distortion])
  };
  return mixdesk;
}
