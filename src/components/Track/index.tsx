import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { keys } from 'ramda'

import Fader from './../Fader'
import Knob from '../Knob'

import style from './style.module.css'
import { getAverage } from '../MasterTrack/helpers'

const DEFAULT_VOLUME = 70

interface TrackProps {
  analyser: AnalyserNode
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
  onVolumeChange: (id) => any
  onSendLevelChange?: (id) => void
  onPanChange: (id) => {}
}

const Track: React.FC<TrackProps> = (props) => {
  const [soloMutePriority, setSoloMutePriority] = useState('')

  const setSoloMutePriorityHelper = (value: 's' | 'm') => {
    if (soloMutePriority.includes(value)) {
      setSoloMutePriority(soloMutePriority.replace(value, ''))
    } else if (soloMutePriority.length < 2) {
      setSoloMutePriority(soloMutePriority + value)
    } else {
      setSoloMutePriority(value)
    }
  }

  const analyserDiv = useRef<HTMLDivElement>()

  const height = 210
  const array = new Uint8Array(props.analyser.frequencyBinCount)
  props.analyser.getByteFrequencyData(array)

  let average, frame
  const drawMeter = () => {
    props.analyser.getByteFrequencyData(array)
    average = getAverage(array)

    frame = requestAnimationFrame(() => {
      drawMeter()
      if (analyserDiv.current) {
        analyserDiv.current.style.height = `${(height / 100) * average}px`
      }
    })
  }

  drawMeter()

  useEffect(() => {
    return cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={style.track}>
      <div className={style.meterValue} ref={analyserDiv} />

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
          onClick={() => {
            setSoloMutePriorityHelper('m')
            props.onMute(props.id)
          }}
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
          className={classnames(
            style.button,
            style.soloButton,
            props.isSolo && style.isPressed
          )}
          onClick={() => {
            setSoloMutePriorityHelper('s')
            if (soloMutePriority === 'm') {
              props.onMute(props.id)
              props.onSolo(props.id)
            } else if (soloMutePriority === 'ms') {
              props.onSolo(props.id)
              props.onMute(props.id)
            } else if (soloMutePriority === 'sm') {
              props.onSolo(props.id)
            } else {
              props.onSolo(props.id)
            }
          }}
        >
          S
        </button>
      </div>

      <Knob
        degrees={260}
        min={1}
        max={100}
        value={props.pan + 1}
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

      <Fader
        onChange={props.onVolumeChange}
        value={props.volume}
        onDoubleClick={() => props.onVolumeChange(DEFAULT_VOLUME)}
        isVertical
      />

      <div className={style.title}>{props.title}</div>
    </div>
  )
}

Track.defaultProps = {
  // TODO: Default track props do not work
  title: 'Untitled',
  volume: DEFAULT_VOLUME,
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
