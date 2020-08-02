import React from 'react'

import { useMixer } from '../../hooks/useMixer'
import { DeskContainer } from '../Desk'
import { Context } from '../Context'
import { Delay, Reverb, Distortion } from '../../models/fx'

export const Mixdesk = ({
  tracks = [],
  effects = [Delay, Reverb, Distortion]
}) => {
  const context = useMixer(tracks, effects)
  const { mx, state, dispatch } = context

  return (
    <Context.Provider value={{ mx, dispatch }}>
      <DeskContainer {...state} />
    </Context.Provider>
  )
}
