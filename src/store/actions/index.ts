import { curry } from 'ramda'

export const play = async ({dispatch, mixdesk}) => {
  await mixdesk.play()

  return dispatch({ type: 'PLAYBACK_PLAY' })
}

export const pause = async ({dispatch, mixdesk}) => {
  await mixdesk.pause()

  return dispatch({ type: 'PLAYBACK_PAUSE' })
}

export const rewind = async ({dispatch, mixdesk}) => {
  await mixdesk.rewind()

  return dispatch({ type: 'PLAYBACK_REWIND' })
}

export const setMasterVolume = curry(async ({dispatch, mixdesk}, value) => {
  await mixdesk.setMasterTrackVolume(value)

  return dispatch({
    type: 'PLAYBACK_SET_MASTER_TRACK_VOLUME',
    payload: {
      value
    }
  })
})


export const setSendParamValue = curry(
  async ({dispatch, mixdesk}, effectId, parameterId, value) => {
    await mixdesk.setSendParamValue(effectId, parameterId, value)

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

export const setTrackVolume = curry(async ({dispatch, mixdesk}, trackId, value) => {
  await mixdesk.setTrackVolume(trackId, value)

  return dispatch({
    type: 'SET_TRACK_VOLUME',
    payload: {
      trackId,
      value
    }
  })
})

export const setTrackSendLevel = curry(
  async ({dispatch, mixdesk}, trackId, fxId, value) => {
    await mixdesk.setTrackSendLevel(trackId, fxId, value)

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


export const toggleTrackSolo = curry(async ({dispatch, mixdesk}, trackId) => {

  await mixdesk.soloTrack(trackId)

  return dispatch({
    type: 'TRACK_SOLO_TOGGLE',
    payload: {
      trackId
    }
  })
})


export const toggleTrack = curry(async ({dispatch, mixdesk}, trackId) => {
  console.log('action', trackId);
  await mixdesk.toggleTrack(trackId)

  return dispatch({
    type: 'TRACK_MUTE_TOGGLE',
    payload: {
      trackId
    }
  })
})

export const toggleTrackFx = curry(async ({dispatch, mixdesk}, trackId) => {
  await mixdesk.toggleTrackFx(trackId)

  return dispatch({
    type: 'TRACK_FX_TOGGLE',
    payload: {
      trackId
    }
  })
})
