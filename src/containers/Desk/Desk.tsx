import React, { useContext } from 'react'

import Desk from './../../components/Desk'
import { EffectContainer } from './../Effect'
import { Context } from './../Context'
import { TrackContainer } from './../Track/Track'

import { play, pause, rewind, setMasterVolume, loop } from './../../store/actions'

// TODO: add types
export const DeskContainer = ({ tracks, effects, playback, children }) => {
  const context = useContext(Context)

  const Tracks = tracks.map((track) => (
    <TrackContainer {...track} key={track.id} />
  ))
  const Effects = effects.map((effect) => (
    <EffectContainer {...effect} key={effect.id} />
  ))

  return (
    <Desk
      onPlay={() => play(context)}
      onPause={() => pause(context)}
      onRewind={() => rewind(context)}
      onLoop={loop(context)}
      onMasterVolumeChange={setMasterVolume(context)}
      tracks={Tracks}
      effects={Effects}
      playback={playback}
    >{children}</Desk>
  )
}
