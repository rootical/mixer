import React from 'react';
import Fader from './../Fader';
import Radio from './../Radio';
import style from './style.css';
const EffectParameterMap = {
    'fader': Fader,
    'radio': Radio,
};
const getControlByType = type => EffectParameterMap[type];
const EffectParameter = ({ onChange, ...props }) => {
    const { id, name, type = 'fader', } = props;
    const Control = getControlByType(type);
    return Control
        ? (React.createElement("div", { className: style.parameter, key: id },
            React.createElement("span", { className: style.title },
                name,
                ":"),
            React.createElement("div", { className: style.controlContainer },
                React.createElement(Control, Object.assign({}, props, { onChange: onChange(id) }))))) : null;
};
export default EffectParameter;
//# sourceMappingURL=index.js.map