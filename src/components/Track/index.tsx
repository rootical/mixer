import React from 'react';
import classnames from 'classnames';
import {keys} from 'ramda';

import Fader from './../Fader';

import style from './style.module.css';

interface TrackProps {
    id: string;
    title: string;
    volume: number;
    isMuted: boolean;
    isSolo: boolean;
    isEffectsDisabled: boolean;
    // TODO: Types
    send: any;
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
            keys(props.send).length > 0 && <button
            className={classnames(style.button, props.isEffectsDisabled && style.isPressed)}
            onClick={() => props.onBypass(props.id)}>
                Bypass FX
              </button>
            }
        </div>

        <Fader onChange={props.onVolumeChange} value={props.volume} isVertical={true} />

        {keys(props.send).length > 0 &&
            <div className={style.sends}>
                {keys(props.send).map(sendId => (
                    <div className={style.send} key={sendId}>
                        <span className={style.sendTitle}>{sendId}</span>
                        <Fader onChange={props.onSendLevelChange(sendId)} value={props.send[sendId]} />
                    </div>
                ))}
            </div>
        }

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
  send: null,
  onMute: (id) => id,
  onSolo: (id) => id,
  onBypass: (id) => id,
  onVolumeChange: (id) => id,
  onSendLevelChange: (id) => id
} as Partial<TrackProps>;

export default Track;
