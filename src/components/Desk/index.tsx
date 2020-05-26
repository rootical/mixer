import React from 'react';
import classnames from 'classnames';

import Meter from './../Meter';
import Icon from './../Icon';

import {
    isPlaying,
    isPaused,
    isNotActive,
} from './../../helpers/playback';

import style from './style.module.css';

interface DeskProps {
  // TODO: find
    playback: any;
    onPlay: () => void;
    onPause: () => void;
    onRewind: () => void;
    tracks: [];
    effects?: [];
};

const Desk: React.FC<DeskProps> = ({
    playback = {},

    onPlay = () => {},
    onPause = () => {},
    onRewind = () => {},

    tracks = [],
    effects = [],
}) => {
    const btnClassNames = (isButtonPressed: boolean) => classnames(
        style.control,
        style.button,
        isButtonPressed && style.isButtonPressed,
    );

    const isDisabled = isNotActive(playback);

    return (
        <div className={style.desk}>
            <div className={style.tracks}>
                {tracks}
            </div>

            <div className={style.controlsContainer}>
                <div className={style.controls}>
                    {playback.analyser && <Meter analyser={playback.analyser} />}

                    <button
                        className={btnClassNames(isPlaying(playback))}
                        onClick={onPlay}
                        disabled={isDisabled}
                    >
                        <Icon type="play" />
                        Play
                    </button>

                    <button
                        className={btnClassNames(isPaused(playback))}
                        onClick={onPause}
                        disabled={isDisabled}
                    >
                        <Icon type="pause" />
                        Pause
                    </button>

                    <button
                        className={btnClassNames(false)}
                        onClick={onRewind}
                        disabled={isDisabled}
                    >
                        <Icon type="rewind" />
                        Rewind
                    </button>
                </div>

                <div className={style.effects}>
                    {effects}
                </div>
            </div>
        </div>
    );
};

export default Desk;
