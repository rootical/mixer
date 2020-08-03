import React from 'react'
import classnames from 'classnames'

import MasterTrack from '../MasterTrack'
import { isPlaying, isPaused, isNotActive } from './../../helpers/playback'

import style from './style.module.css'
import { Playback } from '../../helpers'

interface DeskProps {
  // TODO: Types
  playback: Playback
  onPlay: () => void
  onPause: () => void
  onRewind?: () => void
  onLoop: (value) => void
  onMasterVolumeChange: (value) => void
  tracks: any[]
  effects: any[]
}

const Desk: React.FC<DeskProps> = ({
  playback = {},
  onPlay = () => {},
  onPause = () => {},
  // onRewind = () => {},
  onMasterVolumeChange = () => {},
  onLoop = () => {},
  tracks = [],
  effects = []
}) => {
  const btnClassNames = (isButtonPressed: boolean) =>
    classnames(
      style.control,
      style.button,
      isButtonPressed && style.isButtonPressed
    )

  const isDisabled = isNotActive(playback)

  const loopButtonClassNames = () =>
      classnames(
        style.controlButton,
        playback.isLooped && style.isActive,
        !playback.isLooped && style.isNotActive
      )

  return (
    <div className={style.desk}>
      <div className={style.tracks}>
        {tracks}
        {playback.analyser && (
          <MasterTrack
            volume={playback.volume}
            onVolumeChange={onMasterVolumeChange}
            analyser={playback.analyser}
          />
        )}
      </div>

      <div className={style.controlsContainer}>
        <div className={style.progressContainer}>
          <div className={style.progressBar} style={{ width: '30%' }} />
          <div className={style.progressTimeNow}>1:17</div>
          <div className={style.progressTime}>3:22</div>
        </div>
        <div className={style.controls}>
          <div className={style.controlsLeft}>
            <button className={style.controlButton}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 28'
                width='24px'
              >
                <defs />
                <text
                  fill='#fff'
                  dominantBaseline='text-before-edge'
                  fontFamily="'Avenir Next','AvenirNext-Bold'"
                  fontSize='9'
                  fontStyle='none'
                  fontWeight='700'
                  transform='translate(6 10)'
                >
                  <tspan>15</tspan>
                </text>
                <path
                  fill='#fff'
                  d='M12.4 4V.5a.4.4 0 00-.8-.3L7.5 4.3a1 1 0 000 1.4l4.1 4.2c.3.3.8 0 .8-.3V6a9.8 9.8 0 11-10 9.8H.6A11.7 11.7 0 1012.4 4z'
                />
              </svg>
            </button>
            {!isPlaying(playback) ? (
              <button
                className={btnClassNames(isPlaying(playback))}
                onClick={onPlay}
                disabled={isDisabled}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32px'
                  viewBox='0 0 32 36'
                >
                  <defs />
                  <path fill='#fff' d='M31.5 18L.5 36V0z' />
                </svg>
              </button>
            ) : (
              <button
                className={btnClassNames(isPaused(playback))}
                onClick={onPause}
                disabled={isDisabled}
              >
                <svg
                  width='32px'
                  height='36px'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    id='svg_1'
                    d='m29.05829,98.186882l-18.799027,0c-4.588525,0 -8.308265,-3.719734 -8.308265,-8.308266l0,-79.706622c0,-4.588521 3.71974,-8.308262 8.308265,-8.308262l18.799027,0c4.588522,0 8.308264,3.71974 8.308264,8.308262l0,79.706622c0,4.588531 -3.719742,8.308266 -8.308264,8.308266z'
                  />
                  <path
                    id='svg_2'
                    d='m88.74073,98.108856l-18.799034,0c-4.588516,0 -8.308258,-3.719734 -8.308258,-8.308266l0,-79.706615c0,-4.588525 3.719742,-8.308266 8.308258,-8.308266l18.799034,0c4.588531,0 8.308273,3.719741 8.308273,8.308266l0,79.706615c0,4.588531 -3.719742,8.308266 -8.308273,8.308266z'
                  />
                  <path
                    id='svg_3'
                    d='m30.498528,2.009229c1.62159,1.516152 2.650631,3.65859 2.650631,6.054068l0,79.706615c0,4.588539 -3.71974,8.308273 -8.30826,8.308273l-18.799028,0c-0.493438,0 -0.970003,-0.063263 -1.440241,-0.1455c1.484523,1.387512 3.464588,2.254196 5.657634,2.254196l18.799027,0c4.588522,0 8.308264,-3.719734 8.308264,-8.308266l0,-79.706622c0,-4.095088 -2.96904,-7.477437 -6.868027,-8.162765z'
                  />
                  <path
                    id='svg_4'
                    d='m90.180962,1.93121c1.621582,1.516153 2.65065,3.658586 2.65065,6.054068l0,79.706608c0,4.588539 -3.719742,8.308273 -8.308273,8.308273l-18.799026,0c-0.493439,0 -0.970009,-0.063263 -1.440239,-0.1455c1.484512,1.387535 3.464584,2.254196 5.657623,2.254196l18.799034,0c4.588531,0 8.308273,-3.719734 8.308273,-8.308266l0,-79.706615c0,-4.095092 -2.969055,-7.479549 -6.868042,-8.162765z'
                  />
                  <path
                    id='svg_5'
                    fill='none'
                    stroke='#000000'
                    strokeMiterlimit='10'
                    d='m29.05829,98.186882l-18.799027,0c-4.588525,0 -8.308265,-3.719734 -8.308265,-8.308266l0,-79.706622c0,-4.588521 3.71974,-8.308262 8.308265,-8.308262l18.799027,0c4.588522,0 8.308264,3.71974 8.308264,8.308262l0,79.706622c0,4.588531 -3.719742,8.308266 -8.308264,8.308266z'
                  />
                  <path
                    id='svg_6'
                    fill='none'
                    stroke='#000000'
                    strokeMiterlimit='10'
                    d='m88.74073,98.108856l-18.799034,0c-4.588516,0 -8.308258,-3.719734 -8.308258,-8.308266l0,-79.706615c0,-4.588525 3.719742,-8.308266 8.308258,-8.308266l18.799034,0c4.588531,0 8.308273,3.719741 8.308273,8.308266l0,79.706615c0,4.588531 -3.719742,8.308266 -8.308273,8.308266z'
                  />
                </svg>
              </button>
            )}
            <button className={style.controlButton}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24px'
                viewBox='0 0 24 28'
              >
                <defs />
                <text
                  fill='#fff'
                  dominantBaseline='text-before-edge'
                  fontFamily="'Avenir Next','AvenirNext-Bold'"
                  fontSize='9'
                  fontStyle='none'
                  fontWeight='700'
                  transform='translate(6 10)'
                >
                  <tspan>15</tspan>
                </text>
                <path
                  fill='#fff'
                  d='M11.9 4V.5c0-.4.4-.5.7-.3l4.2 4.2a1 1 0 010 1.4L12.6 10a.4.4 0 01-.7-.3V6a9.8 9.8 0 109.9 9.8h1.9A11.7 11.7 0 1111.9 4z'
                />
              </svg>
            </button>
          </div>

          <div className={style.controlsCustom}>
            {/* TODO: allow passing custom components */}
          </div>

          <div className={style.controlsRight}>
            <div className={style.masterVolume}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30px'
                viewBox='0 0 30 25'
              >
                <defs />
                <path
                  fill='#fff'
                  d='M16 3.7v17.1l-9.4-3.7H2V7.5h4.6zM0 5.5V19h6.2L18 23.8V.8L6.2 5.4zM22.2 5a1 1 0 10-1.4 1.4 8.2 8.2 0 012.4 5.9 8.2 8.2 0 01-2.4 5.8 1 1 0 101.4 1.4 10.1 10.1 0 003-7.2c0-2.8-1.1-5.3-3-7.3z'
                />
                <path
                  fill='#fff'
                  d='M24.9.3a1 1 0 00-1.4 1.4 15 15 0 010 21.1 1 1 0 101.4 1.4 17 17 0 000-24z'
                />
              </svg>

              <div className={style.masterVolumeContainer}>
                <div className={style.masterVolumeBar}>
                  <div style={{ width: '70%' }} />
                </div>
                <button
                  className={style.masterVolumeKnob}
                  style={{ left: '70%' }}
                />
              </div>
            </div>
            <button
              className={loopButtonClassNames()}
              onClick={() => onLoop(!playback.isLooped)}
              disabled={isDisabled}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='31px'
                viewBox='0 0 31 28'
              >
                <defs />
                <path
                  fill='#fff'
                  d='M28.3 4.4L24 0v3.4H10.4A10.5 10.5 0 002 19.8l1.4-1.4A8.4 8.4 0 012 13.9c0-4.7 3.8-8.5 8.4-8.5H24V9zM2.7 23.2l4.4 4.4v-3.4h13.5a10.5 10.5 0 008.6-16.4l-1.5 1.4a8.4 8.4 0 011.3 4.6c0 4.6-3.7 8.4-8.4 8.4H7.1v-3.4z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {effects.length > 0 && <div className={style.effects}>{effects}</div>}
    </div>
  )
}

export default Desk
