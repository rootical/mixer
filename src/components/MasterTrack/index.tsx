import React, { useRef, useEffect } from 'react'

import { getAverage, createMeterGradient } from './helpers'

import style from './style.module.css'
import trackStyle from './../Track/style.module.css'
import Fader from '../Fader'

interface MasterTrackProps {
  analyser: AnalyserNode
  width?: number
  height?: number
  volume?: number
  onVolumeChange: (value) => void
}
// TODO: remove the master track component and add the isMaster prop to a Track component
const MasterTrack: React.FC<MasterTrackProps> = ({
  analyser = null,
  width = 6,
  height = 210,
  volume = 70,
  onVolumeChange
}) => {
  if (!analyser) {
    return null
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const context = canvasRef.current && canvasRef.current.getContext('2d')
    const array = new Uint8Array(analyser.frequencyBinCount)

    const drawMeter = () => {
      analyser.getByteFrequencyData(array)

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

  return (
    <div className={`${style.meter} ${trackStyle.track}`}>
      <canvas
        className={style.meterValue}
        width={width}
        height={height}
        ref={canvasRef}
      />

      <Fader onChange={onVolumeChange} isVertical value={volume} />

      <div className={trackStyle.title}>Master</div>
    </div>
  )
}

export default MasterTrack
