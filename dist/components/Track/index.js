import React from 'react';
import classnames from 'classnames';
import { keys } from 'ramda';
import Fader from './../Fader';
import style from './style.css';
const Track = ({ id, title = 'Untitled', volume = 0, isMuted = false, isEffectsDisabled = false, send = {}, onMute = (id) => { }, onBypass = (id) => { }, onVolumeChange = (id) => { }, onSendLevelChange = (id) => { }, }) => (React.createElement("div", { className: style.track },
    React.createElement(Fader, { onChange: onVolumeChange, value: volume, isVertical: true }),
    React.createElement("div", { className: "buttons" },
        React.createElement("button", { className: classnames(style.button, isMuted && style.isPressed), onClick: () => onMute(id) }, "Mute"),
        React.createElement("button", { className: classnames(style.button, isEffectsDisabled && style.isPressed), onClick: () => onBypass(id) }, "Bypass FX")),
    React.createElement("div", { className: style.sends }, send && keys(send).map(sendId => (React.createElement("div", { className: style.send, key: sendId },
        React.createElement("span", { className: style.sendTitle }, sendId),
        React.createElement(Fader, { onChange: onSendLevelChange(sendId), value: send[sendId] }))))),
    React.createElement("div", { className: style.title }, title)));
export default Track;
//# sourceMappingURL=index.js.map