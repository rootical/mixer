import {useRef, useReducer, useEffect} from 'react';

import {reducer} from './store/reducers';
import {getDispatchWithLog, createState} from '/store/helpers';

import Mixer from './models/mixer';
import Delay from './models/fx/delay';
import Reverb from './models/fx/reverb';
import Distortion from './models/fx/distortion';


// maybe effects could be passed here as well
const useMixer = (tracks) => {
    const mx = useRef();

    // createState could be used here to put some placeholders based on provided tracks
    const [state, dispatch] = useReducer(reducer, {
        tracks: [],
        effects: [],
        playback: {},
    });

    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        const onLoad = async trackStates => {
            const {tracks, effects, playback} = createState(mx.current);

            // this could be unifed under some kind of INIT action
            await dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
            await dispatchWithLog({ type: 'SET_EFFECTS', payload: effects });
            await dispatchWithLog({ type: 'SET_PLAYBACK', payload: playback });
            await dispatchWithLog({ type: 'PLAYBACK_READY' });
        }

        if (!mx.current) {
            mx.current = new Mixer([], [Delay, Reverb, Distortion]);
        }

        // @ts-ignore
        mx.current.load(tracks).then(onLoad);
    }, [tracks]);

    return {
        mx,
        state,
        dispatch: dispatchWithLog,
    };
}


export default useMixer;
