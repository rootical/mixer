import { useEffect } from 'react'
import { UseMixerHook } from './useMixer'
import { PLAYBACK_STATUS } from '../constants'

export const useProgress = (context: UseMixerHook) => {
  const { dispatch, state, mx } = context

  useEffect(() => {
    let interval

    switch (state.playback.status) {
      case PLAYBACK_STATUS.PLAYING:
        interval = setInterval(() => {
          dispatch({
            type: 'PLAYBACK_SET_CURRENT_POSITION',
            payload: mx.current.currentTime
          })
        }, 1000)
        return () => clearInterval(interval)
      default:
        return () => clearInterval(interval)
    }
  }, [state.playback.status])

  return state.playback.currentPosition
}
