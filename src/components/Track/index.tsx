import React from 'react';
import classnames from 'classnames';
import {keys} from 'ramda';

import Fader from './../Fader';

import style from './style.css';


interface TrackProps {
    id: number;
    title: string;
    volume: number;
    isMuted: boolean;
    isEffectsDisabled: boolean;
    send: {};
    onMute: (id) => {};
    onBypass: (id) => {};
    onVolumeChange: (id) => {};
    onSendLevelChange: (id) => {};
}

const Track: React.FC<TrackProps> = ({
    id,
    title = 'Untitled',
    volume = 0,
    isMuted = false,
    isEffectsDisabled = false,
    send = {},

    onMute = (id) => {},
    onBypass = (id) => {},
    onVolumeChange = (id) => {},
    onSendLevelChange = (id) => {},
}) => (
    <div className={style.track}>
        <Fader onChange={onVolumeChange} value={volume} isVertical={true} />

        <div className="buttons">
            <button
                className={classnames(style.button, isMuted && style.isPressed)}
                onClick={() => onMute(id)}>
                    Mute
            </button>
            <button
                className={classnames(style.button, isEffectsDisabled && style.isPressed)}
                onClick={() => onBypass(id)}>
                    Bypass FX
            </button>
        </div>

        <div className={style.sends}>
            {send && keys(send).map(sendId => (
                <div className={style.send} key={sendId}>
                    <span className={style.sendTitle}>{sendId}</span>
                    <Fader onChange={onSendLevelChange(sendId)} value={send[sendId]} />
                </div>
            ))}
        </div>

        <div className={style.title}>{title}</div>
    </div>
);

export default Track;