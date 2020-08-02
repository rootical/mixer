import React, { useContext } from 'react'

import Track from '../../components/Track'
import { Context } from '../Context'

import {
  setTrackVolume,
  setTrackSendLevel,
  setTrackPan,
  toggleTrack,
  toggleTrackFx,
  toggleTrackSolo
} from '../../store/actions'

export const TrackContainer = (props) => {
  const { id: trackId } = props
  const context = useContext(Context)

  return (
    <Track
      {...props}
      onSolo={toggleTrackSolo(context)}
      onMute={toggleTrack(context)}
      onBypass={toggleTrackFx(context)}
      onVolumeChange={setTrackVolume(context, trackId)}
      onSendLevelChange={setTrackSendLevel(context, trackId)}
      onPanChange={setTrackPan(context)}
    />
  )
}
