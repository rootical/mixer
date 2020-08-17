import { useEffect, useState } from 'react'
import { UseMixerHook } from './useMixer'
import { PLAYBACK_STATUS } from '../constants'

export const useProgress = (context: UseMixerHook) => {

  const [seconds, setSeconds] = useState(context.state.playback.currentPosition || 1)

  const { dispatch, state } = context

  useEffect(() => {
      if (state.playback.status === PLAYBACK_STATUS.PLAYING) {
        const interval = setInterval(() => {
          setSeconds((seconds) => {
            dispatch({ type: 'PLAYBACK_SET_CURRENT_POSITION', payload: seconds })
            return seconds + 1
          })
        }, 1000)
        return () => clearInterval(interval)
      } else if (state.playback.status === PLAYBACK_STATUS.PAUSED) {
        setSeconds((seconds) => seconds + 1)
        return dispatch({ type: 'PLAYBACK_SET_CURRENT_POSITION', payload: seconds })
      }
      else return () => {}

  }, [state.playback.status])

  return seconds
}
