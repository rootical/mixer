import React, {useContext} from 'react';

import Desk from './../../components/Desk';
import {EffectContainer} from './../Effect';
import {Context} from './../Context';
import {TrackContainer} from './../Track/Track';

import {
    play,
    pause,
    rewind,
    setMasterVolume
} from './../../store/actions';

// TODO: add types
export const DeskContainer = ({
    tracks,
    effects,
    playback,
}) => {
    const dispatch = useContext(Context);

    const Tracks = tracks.map(track => (<TrackContainer {...track} key={track.id} />));
    const Effects = effects.map(effect => (<EffectContainer {...effect} key={effect.id} />));

    return (
        <Desk
            onPlay={() => play(dispatch)}
            onPause={() => pause(dispatch)}
            onRewind={() => rewind(dispatch)}
            onMasterVolumeChange={(value) => setMasterVolume(dispatch, value)}
            tracks={Tracks}
            effects={Effects}
            playback={playback}
        >
        </Desk>
    );
}
