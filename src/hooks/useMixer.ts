import { useRef, useReducer, useEffect } from 'react'

import { reducer } from '../store/reducers'
import { getDispatchWithLog, createState } from '../store/helpers'

import { Mixer } from '../models/mixer'
import Track from '../models/track'
import { FX } from '../models/fx/fx-base'
import { Playback } from '../helpers/entities'

export interface MixerState {
  tracks: Track[]
  effects: FX[]
  playback: Playback
  loadingState?: () => MixerLoadingState
}

export interface MixerLoadingState {
  length: number
  current: number
}

export interface UseMixerHook {
  mx: {
    current?: Mixer
  }
  state: MixerState
  dispatch: React.Dispatch<any>
}

export const useMixer = (tracks, effects, hasMasterTrack, onLoading): UseMixerHook => {
  const mx = useRef<Mixer>()

  const [state, dispatch] = useReducer(reducer, <MixerState>{
    tracks: [],
    effects: [],
    playback: {}
  })

  const dispatchWithLog = getDispatchWithLog(dispatch)

  useEffect(() => {
    const onLoad = async () => {
      const { tracks, effects, playback } = createState(
        mx.current,
        hasMasterTrack
      )

      await dispatchWithLog({ type: 'SET_TRACKS', payload: tracks })
      await dispatchWithLog({ type: 'SET_EFFECTS', payload: effects })
      await dispatchWithLog({ type: 'SET_PLAYBACK', payload: playback })
      await dispatchWithLog({ type: 'PLAYBACK_READY' })
    }

    if (!mx.current) {
      mx.current = new Mixer([], effects)
    }

    mx.current
      .stop()
      .then(() => mx.current.load(tracks, onLoading))
      .then(onLoad)
  }, [tracks])

  return {
    mx,
    state,
    dispatch: dispatchWithLog
  }
}
