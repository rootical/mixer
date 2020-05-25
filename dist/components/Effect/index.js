import React from 'react';
import EffectParameter from '../EffectParameter';
import style from './style.css';
const Effect = ({ name = 'Untitled', parameters = [], onParamChange = () => { }, }) => {
    return (React.createElement("div", { className: style.effect },
        React.createElement("div", { className: style.title }, name),
        parameters && parameters.map(parameter => (React.createElement("div", { className: style.parameterValue, key: parameter.id },
            React.createElement(EffectParameter, Object.assign({}, parameter, { onChange: onParamChange })))))));
};
export default Effect;
//# sourceMappingURL=index.js.map