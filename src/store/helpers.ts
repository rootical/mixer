import {curry, reject, not} from 'ramda';

import {
    createEffectEntity,
    createPlaybackEntity,
    createTrackEntity,
} from '../helpers/entities';
import { Mixer } from '../models/mixer';


const compact = reject(item => not(Boolean(item)));

/**
 * Brings dispatch arguments to console
 *
 * @param {function} — original dispatch
 * @returns {function} — curried version with original dispatch binded
 */
export const getDispatchWithLog = curry((dispatch, args) => {
    console.log('[DISPATCH LOG]', args);

    return dispatch(args);
});

export const createState = (mixdesk: Mixer) => {
    if (typeof window === 'undefined') {
      return null;
    }

    const tracks = compact(mixdesk.tracks.map(createTrackEntity));

    const effects = compact(mixdesk.fx.map(createEffectEntity));

    const playback = createPlaybackEntity({
        analyser: mixdesk.analyser,
        masterVolume: mixdesk.volume,
        duration: mixdesk.tracks[0].buffer.duration
    });

    return {
        tracks,
        effects,
        playback,
    };
}

