import React from 'react'

import { useMixer, UseMixerHook, MixerLoadingState } from '../../hooks/useMixer'
import { useProgress } from '../../hooks/useProgress'
import { DeskContainer } from '../Desk'
import { Context } from '../Context'
import { Delay, Reverb, Distortion, FX } from '../../models/fx'

export interface MixdeskProps  {
  tracks: any[],
  effects: FX[],
  hasMasterTrack?: boolean,
  onLoading?: (loadingState) => MixerLoadingState
}

export const Mixdesk: React.FC<MixdeskProps> = ({
  tracks = [],
  effects = [Delay, Reverb, Distortion],
  hasMasterTrack = true,
  onLoading = () => {},
  children
}) => {

  const context: UseMixerHook = useMixer(tracks, effects, hasMasterTrack, onLoading)

  const { mx, state, dispatch } = context

  useProgress(context)

  return (
    <Context.Provider value={{ mx, dispatch }}>
      <DeskContainer {...state}>
       {children && children}
      </DeskContainer>
    </Context.Provider>
  )
}
