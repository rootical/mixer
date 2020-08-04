import React from 'react'
import classnames from 'classnames'
import { keys } from 'ramda'

import Fader from './../Fader'
import Knob from '../Knob'

import style from './style.module.css'

interface TrackProps {
  id: string
  title: string
  volume: number
  pan: number
  isMuted: boolean
  isSolo: boolean
  isEffectsDisabled: boolean
  // TODO: Types
  fx: any
  onMute: (id) => {}
  onSolo: (id) => {}
  onBypass: (id) => {}
  onVolumeChange: (id) => {}
  onSendLevelChange?: (id) => {}
  onPanChange: (id) => {}
}

const Track: React.FC<TrackProps> = (props) => (
  <div className={style.track}>
    {keys(props.fx).length > 0 && (
      <button
        className={classnames(
          style.button,
          props.isEffectsDisabled && style.isPressed
        )}
        onClick={() => props.onBypass(props.id)}
      >
        Bypass FX
      </button>
    )}
    <div className={style.trackControls}>
      <button
        className={classnames(style.button, props.isMuted && style.isPressed)}
        onClick={() => props.onMute(props.id)}
      >
        M
      </button>
      <div
        className={classnames(
          style.buttonSeparator,
          props.isMuted || props.isSolo ? style.isHidden : ''
        )}
      />
      <button
        className={classnames(style.button, props.isSolo && style.isPressed)}
        onClick={() => props.onSolo(props.id)}
      >
        S
      </button>
    </div>

    <Knob
      degrees={180}
      min={1}
      max={100}
      value={props.pan}
      size={50}
      onChange={props.onPanChange(props.id)}
    />

    {keys(props.fx).length > 0 && (
      <div className={style.sends}>
        {keys(props.fx).map((sendId) => (
          <div className={style.send} key={sendId}>
            <span className={style.sendTitle}>{sendId}</span>
            <Fader
              onChange={props.onSendLevelChange(sendId)}
              value={props.fx[sendId]}
            />
          </div>
        ))}
      </div>
    )}

    <Fader onChange={props.onVolumeChange} value={props.volume} isVertical />

    <div className={style.title}>{props.title}</div>
  </div>
)

Track.defaultProps = {
  // TODO: Default track props do not work
  title: 'Untitled',
  volume: 70,
  isMuted: false,
  isSolo: false,
  isEffectsDisabled: false,
  // TODO: why is it always truthy even though no send is passed
  fx: null,
  onMute: (id) => id,
  onSolo: (id) => id,
  onBypass: (id) => id,
  onVolumeChange: (id) => id,
  onSendLevelChange: (id) => id
} as Partial<TrackProps>

export default Track
