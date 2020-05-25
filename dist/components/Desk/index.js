import React from 'react';
import classnames from 'classnames';
import Meter from './../Meter';
import Icon from './../Icon';
import { isPlaying, isPaused, isNotActive, } from './../../helpers/playback';
import style from './style.css';
;
const Desk = ({ playback = {
    analyser: null
}, onPlay = () => { }, onPause = () => { }, onRewind = () => { }, tracks = [], effects = [], }) => {
    const btnClassNames = (isButtonPressed) => classnames(style.control, style.button, isButtonPressed && style.isButtonPressed);
    const isDisabled = isNotActive(playback);
    return (React.createElement("div", { className: style.desk },
        React.createElement("div", { className: style.tracks }, tracks),
        React.createElement("div", { className: style.controlsContainer },
            React.createElement("div", { className: style.controls },
                playback.analyser && React.createElement(Meter, { analyser: playback.analyser }),
                React.createElement("button", { className: btnClassNames(isPlaying(playback)), onClick: onPlay, disabled: isDisabled },
                    React.createElement(Icon, { type: "play" }),
                    "Play"),
                React.createElement("button", { className: btnClassNames(isPaused(playback)), onClick: onPause, disabled: isDisabled },
                    React.createElement(Icon, { type: "pause" }),
                    "Pause"),
                React.createElement("button", { className: btnClassNames(false), onClick: onRewind, disabled: isDisabled },
                    React.createElement(Icon, { type: "rewind" }),
                    "Rewind")),
            React.createElement("div", { className: style.effects }, effects))));
};
export default Desk;
//# sourceMappingURL=index.js.map