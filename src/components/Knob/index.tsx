import React, { Component, createRef } from 'react'
import { throttle } from '../../helpers/throttle'

import style from './style.module.css'

interface KnobProps {
  min: number
  max: number
  size: number
  degrees: number
  value: number
  onChange: any
}

type KnobState = {
  deg: number
  isHovered: boolean
}

type Direction = 'up' | 'down' | 'right' | 'left'

const objectToString = (object) => {
  return JSON.parse(JSON.stringify(object))
}

const calculateDistance = (elem: HTMLElement, mouseX, mouseY) => {
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elem.offsetLeft + 50 / 2), 2) +
        Math.pow(mouseY - (elem.offsetTop + 50 / 2), 2)
    )
  )
}

class Knob extends Component<KnobProps, KnobState> {
  fullAngle: number
  startAngle: number
  endAngle: number
  margin: number = 0
  currentDeg: number
  transformDeg: number
  isDragging: boolean = false

  private oldX: number = 0
  private oldY: number = 0
  private xDirection: Direction
  private yDirection: Direction
  private knobRef = createRef<HTMLDivElement>()

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

    this.currentDeg = Math.floor(
      this.convertRange(
        props.min,
        props.max,
        this.startAngle,
        this.endAngle,
        props.value
      )
    )

    this.transformDeg = this.currentDeg
    this.state = { deg: this.transformDeg, isHovered: false }
  }

  startDrag = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const knob = event.target.getBoundingClientRect()

    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    }

    const moveHandler = (e) => {
      // e.preventDefault()
      // e.stopPropagation()
      this.currentDeg = this.getDeg(e.clientX, e.clientY, pts)
      // this.getDeg(e.clientX, e.clientY, pts)
      // throttle(() => this.getMouseDirection(e), 400)
      console.log(
        'distance',
        calculateDistance(this.knobRef.current, e.clientX, e.clientY)
      )

      this.isDragging = true
      requestAnimationFrame(this.update)

      // document.addEventListener('mousemove', this.getMouseDirection)
    }

    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', () => {
      this.isDragging = false
      document.removeEventListener('mousemove', moveHandler)
      // document.removeEventListener('mousemove', this.getMouseDirection)
    })
  }

  update = () => {
    if (this.isDragging && this.xDirection) {
      throttle(this.update, 200)
    }
    if (this.currentDeg === this.startAngle) this.currentDeg--

    // 160 and 190 are angle range within fader
    const isUpDegree =
      this.currentDeg >= 160 &&
      this.currentDeg <= 190 &&
      this.state.deg <= this.endAngle

    const isDownDegree =
      this.currentDeg >= this.startAngle &&
      this.currentDeg <= 160 &&
      this.state.deg >= this.startAngle

    if (this.yDirection === 'up' && isUpDegree) {
      // console.log('condition only up', this.currentDeg)
      this.setState({ deg: this.getTransformDegree(this.state.deg + 5) })
    } else if (this.yDirection === 'down' && isDownDegree) {
      // console.log('condition only down', this.currentDeg)
      this.setState({ deg: this.getTransformDegree(this.state.deg - 5) })
    } else if (this.xDirection === 'left') {
      // console.log('condition only left', this.currentDeg)
      this.setState({ deg: this.getTransformDegree(this.state.deg - 5) })
    } else if (this.xDirection === 'right') {
      // console.log('condition only right', this.currentDeg)
      this.setState({ deg: this.getTransformDegree(this.state.deg + 5) })
    }

    this.props.onChange(
      Math.floor(
        this.convertRange(
          this.startAngle,
          this.endAngle,
          this.props.min,
          this.props.max,
          this.state.deg
        )
      )
    )
  }

  getTransformDegree(value: number): number {
    if (value <= this.startAngle) {
      return this.startAngle
    }
    if (value >= this.endAngle) {
      return this.endAngle
    }
    return value
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

  onDoubleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.currentDeg = 180
    this.setState({ deg: this.currentDeg })
    this.props.onChange(0)
  }

  render() {
    let kStyle = {
      width: this.props.size,
      height: this.props.size
    }
    let iStyle = objectToString(kStyle)
    let oStyle = objectToString(kStyle)

    oStyle.margin = this.margin

    iStyle.transform = 'rotate(' + this.state.deg + 'deg)'

    return (
      <div
        className={style.knob}
        style={kStyle}
        onDoubleClick={this.onDoubleClick}
        onMouseMove={this.getMouseDirection}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        ref={this.knobRef}
      >
        <div
          className={`${style.knob} ${style.outer}`}
          style={oStyle}
          onMouseDown={this.startDrag}
        >
          <div className={`${style.knob} ${style.inner}`} style={iStyle}>
            <div className={style.grip} />
          </div>
        </div>
      </div>
    )
  }

  private handleHover = () => {
    this.setState((prevState) => ({
      ...prevState,
      isHovered: !prevState.isHovered
    }))
  }

  private getMouseDirection = (e) => {
    // if (!this.state.isHovered) {
    if (this.oldX < e.pageX) {
      this.xDirection = 'right'
    } else {
      this.xDirection = 'left'
    }

    if (this.oldY < e.pageY) {
      this.yDirection = 'down'
    } else {
      this.yDirection = 'up'
    }

    this.oldX = e.pageX
    this.oldY = e.pageY
  }
  // }
}

export default Knob
