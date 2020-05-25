import React from 'react';
import classnames from 'classnames';
import style from './style.css';
const Icon = ({ type }) => (React.createElement("div", { className: classnames(style.icon, style[`icon_type_${type}`]) }));
export default Icon;
//# sourceMappingURL=index.js.map