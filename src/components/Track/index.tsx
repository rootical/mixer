import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import { keys } from 'ramda'

import Fader from './../Fader'
import Knob from '../Knob'

import style from './style.module.css'
import { createMeterGradient, getAverage } from '../MasterTrack/helpers'

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

  if (!props.analyser) {
    return null
  }

  const width = 3, height = 210 - props.volume

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const context = canvasRef.current && canvasRef.current.getContext('2d')
    const array = new Uint8Array(props.analyser.frequencyBinCount)

    const drawMeter = () => {
      props.analyser.getByteFrequencyData(array)

      const average = getAverage(array)

      if (context) {
        context.clearRect(0, 0, width, height)
        context.fillStyle = createMeterGradient(context as any, {
          width,
          height
        })
        context.fillRect(0, 0, width, (height / 100) * average)
      }
      requestAnimationFrame(drawMeter)
    }

    drawMeter()
  }, [])

  return <div className={style.track}>

    <canvas
      className={style.meterValue}
      width={width}
      height={height}
      ref={canvasRef}
    />

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
        disabled={props.isSolo}
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

    <Fader onChange={props.onVolumeChange} value={props.volume} onDoubleClick={() => props.onVolumeChange(DEFAULT_VOLUME)} isVertical />

    <div className={style.title}>{props.title}</div>
  </div>

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
