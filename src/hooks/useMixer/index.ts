import {useRef, useReducer, useEffect} from 'react';

import {reducer} from '../../store/reducers';
import {getDispatchWithLog, createState} from '../../store/helpers';

import {Mixer} from '../../models/mixer';

export const useMixer = (tracks, effects) => {
    const mx = useRef<Mixer>();

    const [state, dispatch] = useReducer(reducer, {
        tracks: [],
        effects: [],
        playback: {},
    });

    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        const onLoad = async () => {
            const {tracks, effects, playback} = createState(mx.current);

            await dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
            await dispatchWithLog({ type: 'SET_EFFECTS', payload: effects });
            await dispatchWithLog({ type: 'SET_PLAYBACK', payload: playback });
            await dispatchWithLog({ type: 'PLAYBACK_READY' });
        }

        if (!mx.current) {
            mx.current = new Mixer([], effects);
        }

        mx.current.stop()
            .then(() => mx.current.load(tracks))
            .then(onLoad);
    }, [tracks]);

    return {
        mx,
        state,
        dispatch: dispatchWithLog,
    };
};
