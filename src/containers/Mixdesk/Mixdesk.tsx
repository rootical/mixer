import React from 'react'

import { useMixer, UseMixerHook } from '../../hooks'
import { DeskContainer } from '../Desk'
import { Context } from '../Context'
import { Delay, Reverb, Distortion, FX } from '../../models/fx'
import { useProgress } from '../../hooks/useProgress'

export interface MixdeskProps  {
  tracks: any[],
  effects: FX[],
  hasMasterTrack?: boolean
}

export const Mixdesk: React.FC<MixdeskProps> = ({
  tracks = [],
  effects = [Delay, Reverb, Distortion],
  hasMasterTrack = true,
  children
}) => {

  const context: UseMixerHook = useMixer(tracks, effects, hasMasterTrack)

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
