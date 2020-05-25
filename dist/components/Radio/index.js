import React from 'react';
import classnames from 'classnames';
import style from './style.css';
const Radio = ({ name, value: currentValue, values = [], onChange = () => { }, }) => (React.createElement("div", { className: style.radio }, values && values.map(value => (React.createElement("div", { key: value, className: style.label, onClick: () => onChange(value) },
    React.createElement("div", { className: classnames(style.control, (value === currentValue) && style.isSelected) }),
    React.createElement("div", { className: style.title }, value))))));
export default Radio;
//# sourceMappingURL=index.js.map