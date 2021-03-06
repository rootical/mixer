import { curry } from 'ramda'

export const play = async ({ dispatch, mx }) => {
  if (mx.current) {
    await mx.current.play()
  }

  return dispatch({ type: 'PLAYBACK_PLAY' })
}

export const pause = async ({ dispatch, mx }) => {
  if (mx.current) {
    await mx.current.pause()
  }

  return dispatch({ type: 'PLAYBACK_PAUSE' })
}

export const rewind = async ({ dispatch, mx }) => {
  if (mx.current) {
    await mx.current.rewind()
  }

  return dispatch({ type: 'PLAYBACK_REWIND' })
}

export const setMasterVolume = curry(async ({ dispatch, mx }, value) => {
  if (mx.current) {
    mx.current.volume = value
  }

  return dispatch({
    type: 'PLAYBACK_SET_MASTER_VOLUME',
    payload: value
  })
})

export const fastForward = curry(async ({ dispatch, mx }, value) => {
  if (mx.current) {
    await mx.current.fastForward(value)
  }

  return dispatch({
    type: 'PLAYBACK_FAST_FORWARD',
    payload: value
  })
})

export const fastRewind = curry(async ({ dispatch, mx }, value) => {
  if (mx.current) {
    await mx.current.fastRewind(value)
  }

  return dispatch({
    type: 'PLAYBACK_FAST_REWIND',
    payload: value
  })
})

export const loop = curry(async ({ dispatch, mx }, value) => {
  if (mx.current) {
    await mx.current.loop(value)
  }

  return dispatch({
    type: 'PLAYBACK_LOOP',
    payload: value
  })
})

export const setCurrentPosition = curry(async ({ dispatch, mx }, value) => {
  if (mx.current) {
    await mx.current.setCurrentPosition(value)
  }

  return dispatch({
    type: 'PLAYBACK_SET_CURRENT_POSITION',
    payload: value
  })
})

export const setSendParamValue = curry(
  async ({ dispatch, mx }, effectId, parameterId, value) => {
    if (mx.current) {
      await mx.current.setSendParamValue(effectId, parameterId, value)
    }

    return dispatch({
      type: 'SET_EFFECT_PARAM_VALUE',
      payload: {
        effectId,
        parameterId,
        value
      }
    })
  }
)

export const setTrackVolume = curry(
  async ({ dispatch, mx }, trackId, value) => {
    if (mx.current) {
      await mx.current.setTrackVolume(trackId, value)
    }

    return dispatch({
      type: 'SET_TRACK_VOLUME',
      payload: {
        trackId,
        value
      }
    })
  }
)

export const setTrackSendLevel = curry(
  async ({ dispatch, mx }, trackId, fxId, value) => {
    if (mx.current) {
      await mx.current.setTrackSendLevel(trackId, fxId, value)
    }

    return dispatch({
      type: 'SET_TRACK_SEND_LEVEL',
      payload: {
        fxId,
        trackId,
        value
      }
    })
  }
)

export const setTrackPan = curry(async ({ dispatch, mx }, trackId, value) => {
  if (mx.current) {
    await mx.current.setTrackPan(trackId, value)
  }

  return dispatch({
    type: 'SET_TRACK_PAN',
    payload: {
      trackId,
      value
    }
  })
})

export const toggleTrackSolo = curry(async ({ dispatch, mx }, trackId) => {
  if (mx.current) {
    await mx.current.soloTrack(trackId)
  }

  return dispatch({
    type: 'TRACK_SOLO_TOGGLE',
    payload: {
      trackId
    }
  })
})

export const toggleTrack = curry(async ({ dispatch, mx }, trackId) => {
  if (mx.current) {
    await mx.current.toggleTrack(trackId)
  }

  return dispatch({
    type: 'TRACK_MUTE_TOGGLE',
    payload: {
      trackId
    }
  })
})

export const toggleTrackFx = curry(async ({ dispatch, mx }, trackId) => {
  if (mx.current) {
    await mx.current.toggleTrackFx(trackId)
  }

  return dispatch({
    type: 'TRACK_FX_TOGGLE',
    payload: {
      trackId
    }
  })
})
