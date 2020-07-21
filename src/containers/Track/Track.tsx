import React, {useContext} from 'react';

import Track from '../../components/Track';
import {Context} from '../Context'

import {
    setTrackVolume,
    setTrackSendLevel,
    toggleTrack,
    toggleTrackFx,
    toggleTrackSolo
} from '../../store/actions';


export const TrackContainer = props => {
    const {id: trackId} = props;
    const dispatch = useContext(Context);

    return (
        <Track
            {...props}

            onSolo={toggleTrackSolo(dispatch)}
            onMute={toggleTrack(dispatch)}
            onBypass={toggleTrackFx(dispatch)}
            onVolumeChange={setTrackVolume(dispatch, trackId)}
            onSendLevelChange={setTrackSendLevel(dispatch, trackId)}
        />
    );
}
