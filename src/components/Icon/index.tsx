import React from 'react'
import classnames from 'classnames'

import style from './style.module.css'

const Icon = ({ type }) => (
  <div className={classnames(style.icon, style[`icon_type_${type}`])} />
)

export default Icon
