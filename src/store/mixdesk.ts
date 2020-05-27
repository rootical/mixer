import {Mixer} from '../models';
import {Delay, Reverb, Distortion} from '../models';

const effects = [
    Delay,
    Reverb,
    Distortion,
];

export const mixdesk = new Mixer([], [Delay, Reverb, Distortion]);
