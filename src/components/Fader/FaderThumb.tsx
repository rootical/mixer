import React from 'react'

import style from './style.module.css'

const FaderThumb = ({
  position = 0,
  isVertical = false,
  events = {},
  isKnobThumb = false,
  className
}) => {
  const styleProperty = isVertical ? 'bottom' : 'left'
  const stylePropertyValue = position + '%'

  return (
    <div
      className={`${style.thumb} ${className}`}
      style={{
        [styleProperty]: stylePropertyValue
      }}
      {...events}
    >
      {isKnobThumb && <div className={style.knobControl} style={{
        [styleProperty]: stylePropertyValue
      }}></div>}

    </div>
  )
}

export default FaderThumb
