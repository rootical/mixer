import Mixer from '../models/mixer';
import Delay from '../models/fx/delay';
import Reverb from '../models/fx/reverb';
import Distortion from '../models/fx/distortion';

import {tracks} from '../config';

// import {always} from 'ramda';

const effects = [
    Delay,
    Reverb,
    Distortion,
];

// const isServer = typeof window === 'undefined';

// export const mixdesk = isServer ? always() : new Mixer(tracks, effects);
export const mixdesk = new Mixer(tracks, effects);
