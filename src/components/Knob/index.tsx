import React, { Component } from 'react'

import style from './style.module.css'

interface KnobProps {
  min: number
  max: number
  color?: string
  size: number
  degrees: number
  value: number
  onChange: any
}

type KnobState = {
  deg: number
}

class Knob extends Component<KnobProps, KnobState> {
  fullAngle: number
  startAngle: number
  endAngle: number
  margin: number
  isDragging: boolean
  currentDeg: number

  static defaultProps = {
    size: 150,
    min: 10,
    max: 30,
    degrees: 270,
    value: 0
  }

  constructor(props) {
    super(props)
    this.fullAngle = props.degrees
    this.startAngle = (360 - props.degrees) / 2
    this.endAngle = this.startAngle + props.degrees
    this.margin = 0
    this.isDragging = false
    this.currentDeg = Math.floor(
      this.convertRange(
        props.min,
        props.max,
        this.startAngle,
        this.endAngle,
        props.value
      )
    )
    this.state = { deg: this.currentDeg }
  }

  startDrag = (e) => {
    e.preventDefault()

    const knob = e.target.getBoundingClientRect()
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    }
    const moveHandler = (e) => {
      this.currentDeg = this.getDeg(e.clientX, e.clientY, pts)
      this.isDragging = true
      requestAnimationFrame(this.update)
    }
    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', moveHandler)
    })
  }

  update = () => {
    if (this.isDragging) {
      requestAnimationFrame(this.update)
    }
    if (this.currentDeg === this.startAngle) this.currentDeg--
    const newValue = Math.floor(
      this.convertRange(
        this.startAngle,
        this.endAngle,
        this.props.min,
        this.props.max,
        this.currentDeg
      )
    )
    this.setState({ deg: this.currentDeg })
    this.props.onChange(newValue)
  }

  getDeg = (cX, cY, pts) => {
    const x = cX - pts.x
    const y = cY - pts.y
    let deg = (Math.atan(y / x) * 180) / Math.PI
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90
    } else {
      deg += 270
    }
    let finalDeg = Math.min(Math.max(this.startAngle, deg), this.endAngle)
    return finalDeg
  }

  convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    )
  }

  dcpy = (o) => {
    return JSON.parse(JSON.stringify(o))
  }

  render() {
    let kStyle = {
      width: this.props.size,
      height: this.props.size
    }
    let iStyle = this.dcpy(kStyle)
    let oStyle = this.dcpy(kStyle)
    oStyle.margin = this.margin
    if (this.props.color) {
      oStyle.backgroundImage =
        'radial-gradient(100% 70%,hsl(210, ' +
        this.currentDeg +
        '%, ' +
        this.currentDeg / 5 +
        '%),hsl(' +
        Math.random() * 100 +
        ',20%,' +
        this.currentDeg / 36 +
        '%))'
    }
    iStyle.transform = 'rotate(' + this.state.deg + 'deg)'

    return (
      <div className={style.knob} style={kStyle}>
        <div className={`${style.knob} ${style.outer}`} style={oStyle} onMouseDown={this.startDrag}>
          <div className={`${style.knob} ${style.inner}`} style={iStyle}>
            <div className={style.grip} />
          </div>
        </div>
      </div>
    )
  }
}

export default Knob
