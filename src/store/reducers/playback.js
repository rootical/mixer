import {
    PLAYBACK_STATUS,
} from './../../constants';


const play = state => ({
    ...state,
    status: PLAYBACK_STATUS.PLAYING
});

const pause = state => ({
    ...state,
    status: PLAYBACK_STATUS.PAUSED,
});

const rewind = state => ({
    ...state,
    currentPosition: 0,
    status: PLAYBACK_STATUS.PLAYING,
});

const setPlaybackReady = state => ({
    ...state,
    status: PLAYBACK_STATUS.READY,
});

const setPlaybackMasterTrackVolume = (state, value) => ({
  ...state,
  masterVolume: value
});

export const playbackReducer = (playback, {type, payload}) => {
    switch (type) {
        case 'PLAYBACK_PLAY':
            return play(playback);
        case 'PLAYBACK_PAUSE':
            return pause(playback);
        case 'PLAYBACK_REWIND':
            return rewind(playback);
        case 'PLAYBACK_READY':
            return setPlaybackReady(playback);
        case 'PLAYBACK_SET_MASTER_TRACK_VOLUME':
            return setPlaybackMasterTrackVolume(playback, payload);
        case 'SET_PLAYBACK':
            return payload;
        default:
            return playback;
    }
};
