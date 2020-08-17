import { PLAYBACK_STATUS } from '../../constants'

const play = (state) => ({
  ...state,
  status: PLAYBACK_STATUS.PLAYING
})

const pause = (state) => ({
  ...state,
  status: PLAYBACK_STATUS.PAUSED
})

const rewind = (state) => ({
  ...state,
  currentPosition: 0,
  status: PLAYBACK_STATUS.PLAYING
})

const setPlaybackReady = (state) => ({
  ...state,
  status: PLAYBACK_STATUS.READY
})

const setMasterVolume = (state, value) => ({
  ...state,
  masterVolume: value
})

const playbackLoop = (state, value) => ({
  ...state,
  isLooped: value
})

const fastRewind = ({currentPosition, ...state}, value) => ({
  ...state,
  currentPosition: currentPosition - value,
});

const fastForward = ({currentPosition, ...state}, value) => ({
  ...state,
  currentPosition: currentPosition + value,
});

const setCurrentPosition = ({currentPosition, ...state}, value) => ({
  ...state,
  currentPosition: value,
});

const setLength = ({...state}, value) => ({
  ...state,
  length: value,
});

export const playbackReducer = (playback, { type, payload }) => {
  switch (type) {
    case 'PLAYBACK_PLAY':
      return play(playback)
    case 'PLAYBACK_PAUSE':
      return pause(playback)
    case 'PLAYBACK_REWIND':
      return rewind(playback)
    case 'PLAYBACK_READY':
      return setPlaybackReady(playback)
    case 'PLAYBACK_SET_MASTER_VOLUME':
      return setMasterVolume(playback, payload)
    case 'PLAYBACK_SET_CURRENT_POSITION':
      return setCurrentPosition(playback, payload)
    case 'PLAYBACK_SET_DURATION':
      return setLength(playback, payload)
    case 'PLAYBACK_LOOP':
      return playbackLoop(playback, payload)
    case 'PLAYBACK_FAST_REWIND':
      return fastRewind(playback, payload);
    case 'PLAYBACK_FAST_FORWARD':
      return fastForward(playback, payload);
    case 'SET_PLAYBACK':
      return payload
    default:
      return playback
  }
}
