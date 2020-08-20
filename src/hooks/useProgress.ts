import { useEffect } from 'react'
import { UseMixerHook } from './useMixer'
import { PLAYBACK_STATUS } from '../constants'

export const useProgress = (context: UseMixerHook) => {

  const { dispatch, state, mx } = context

  useEffect(() => {
      switch (state.playback.status) {
        case PLAYBACK_STATUS.PLAYING:
          const interval = setInterval(() => {
            dispatch({ type: 'PLAYBACK_SET_CURRENT_POSITION', payload: mx.current.currentTime })
          }, 1000)
          return () => clearInterval(interval)
        default:
          return () => {}
      }
  }, [state.playback.status])

  return context.state.playback.currentPosition
}
