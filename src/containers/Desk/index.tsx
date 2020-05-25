import React, {useContext} from 'react';

import Desk from './../../components/Desk';
import Effect from './../Effect';
import Context from './../Context';
import Track from './../Track';

import {
    play,
    pause,
    rewind,
} from './../../store/actions';


const DeskContainer = ({
    tracks,
    effects,
    playback,
}) => {
    const dispatch = useContext(Context);

    const Tracks = tracks.map(track => (<Track {...track} key={track.id} />));
    const Effects = effects.map(effect => (<Effect {...effect} key={effect.id} />));

    return (
        <Desk
            onPlay={() => play(dispatch)}
            onPause={() => pause(dispatch)}
            onRewind={() => rewind(dispatch)}

            tracks={Tracks}
            effects={Effects}
            playback={playback}
        >
        </Desk>
    );
}

export default DeskContainer;