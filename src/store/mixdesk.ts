import {Mixer} from '../models';
import {Delay, Reverb, Distortion} from '../models';

export const mixdesk = new Mixer([], [Delay, Reverb, Distortion]);
