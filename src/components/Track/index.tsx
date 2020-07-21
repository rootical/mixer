import React from 'react';
import classnames from 'classnames';
import {keys} from 'ramda';

import Fader from './../Fader';

import style from './style.module.css';

type FXType = 'delay' | 'rever' | 'distortion'
type FX = Record<FXType, GainNode>;

interface TrackProps {
    id: string;
    title: string;
    volume: number;
    isMuted: boolean;
    isSolo: boolean;
    isEffectsDisabled: boolean;
    // TODO: Types
    fx: FX;
    onMute: (id) => {};
    onSolo: (id) => {};
    onBypass: (id) => {};
    onVolumeChange: (id) => {};
    onSendLevelChange?: (id) => {};
}

const Track: React.FC<TrackProps> = (props) => (

    <div className={style.track}>
        <div className={style.trackControls}>
            <button
                className={classnames(style.button, props.isMuted && style.isPressed)}
                onClick={() => props.onMute(props.id)}>
                    M
            </button>
            <button
                className={classnames(style.button, props.isSolo && style.isPressed)}
                onClick={() => props.onSolo(props.id)}>
                    S
            </button>
            {
            keys(props.fx).length > 0 && <button
            className={classnames(style.button, props.isEffectsDisabled && style.isPressed)}
            onClick={() => props.onBypass(props.id)}>
                Bypass FX
              </button>
            }
        </div>

        {keys(props.fx).length > 0 &&
            <div className={style.sends}>
                {keys(props.fx).map(sendId => (
                    <div className={style.send} key={sendId}>
                        <span className={style.sendTitle}>{sendId}</span>
                        <Fader onChange={props.onSendLevelChange(sendId)} value={props.fx[sendId]} />
                    </div>
                ))}
            </div>
        }

        <Fader onChange={props.onVolumeChange} value={props.volume} isVertical={true} />

        <div className={style.title}>{props.title}</div>
    </div>
);

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
} as Partial<TrackProps>;

export default Track;
