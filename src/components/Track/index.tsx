import React from 'react';
import classnames from 'classnames';
import {keys} from 'ramda';

import Fader from './../Fader';

import style from './style.module.css';

interface Track {
    id: number;
    title: string;
    volume: number;
    isMuted: boolean;
    isSolo: boolean;
    isEffectsDisabled: boolean;
    send?: {};
    onMute: (id) => {};
    onSolo: (id) => {};
    onBypass: (id) => {};
    onVolumeChange: (id) => {};
    onSendLevelChange?: (id) => {};
}

const Track: React.FC<Track> = ({
    id,
    title = 'Untitled',
    volume = 0,
    isMuted = false,
    isSolo = false,
    isEffectsDisabled = false,
    send = {},

    onMute = (id) => id,
    onSolo = (id) => id,
    onBypass = (id) => id,
    onVolumeChange = (id) => id,
    onSendLevelChange = (id) => id,
}) => {

    console.log(send);

    return <div className={style.track}>

        <div className={style.buttonsContainer}>
            <button
                className={classnames(style.button, isMuted && style.isPressed)}
                onClick={() => onMute(id)}>
                    M
            </button>
            <button
                className={classnames(style.button, isSolo && style.isPressed)}
                onClick={() => onSolo(id)}>
                    S
            </button>
            {
            send && <button
            className={classnames(style.button, isEffectsDisabled && style.isPressed)}
            onClick={() => onBypass(id)}>
                Bypass FX
              </button>
            }
        </div>

        <Fader onChange={onVolumeChange} value={volume} isVertical={true} />

        {send &&
            <div className={style.sends}>
                {keys(send).map(sendId => (
                    <div className={style.send} key={sendId}>
                        <span className={style.sendTitle}>{sendId}</span>
                        <Fader onChange={onSendLevelChange(sendId)} value={send[sendId]} />
                    </div>
                ))}
            </div>
        }

        <div className={style.title}>{title}</div>
    </div>
};

export default Track;
