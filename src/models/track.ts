import { generateIdByTitle } from '../helpers/entities'
import { fetchAudioAsArrayBuffer, createPanner } from '../helpers/audio'

import {
  connectNodes,
  createGainNode,
  getNodeParamNormalizedValue,
  setNodeParamNormalizedValue
} from '../helpers/node'

import { TRACK_STATE } from '../constants'

class Track {
  source: AudioBufferSourceNode | null
  title: string
  id: string
  buffer: AudioBuffer = null
  context: AudioContext
  pausedAt: number = 0
  startedAt: number = 0
  muted: boolean = false
  soloed: boolean = false
  playing: boolean = false
  hasBeenPlayed: boolean = false
  bypassFX: boolean = false
  previousVolume: number
  state: TRACK_STATE = TRACK_STATE.NOT_SET
  bus: GainNode
  soloBus: GainNode
  fx: any
  loadingState: Promise<this>
  panner: any

  private isLooped = false;

  constructor({ url, title, context, masterBus, sends = [], volume = 70, pan = 50 }) {
    this.id = generateIdByTitle(title)

    this.title = title
    this.context = context

    this.bus = createGainNode(context)
    this.soloBus = createGainNode(context)
    this.panner = createPanner(context)

    connectNodes(this.bus, this.panner)
    connectNodes(this.panner, this.soloBus)
    connectNodes(this.soloBus, masterBus)

    this.fx = {}

    this.volume = volume
    this.pan = pan

    if (sends.length > 0) {
      this.addFx(sends)
    }

    this.loadingState = this.load(url)
  }

  get volume() {
    return getNodeParamNormalizedValue(this.bus.gain)
  }

  set volume(value) {
    if (this.muted) {
      this.previousVolume = value
    } else {
      setNodeParamNormalizedValue(this.bus.gain, value)
    }
  }

  get pan() {
    return getNodeParamNormalizedValue(this.panner.pan)
  }

  set pan(value) {
    setNodeParamNormalizedValue(this.panner.pan, value)
  }

  get looped() {
    return this.source.loop
  }

  set looped(value) {
    this.isLooped = value
    !this.source && this.createSource()
    this.source.loop = value
  }

  get currentTime() {
    return this.context.currentTime - this.startedAt
  }

  load(url): Promise<this> {
    return fetchAudioAsArrayBuffer(url)
      .then((audioBuffer) => {
        return new Promise((resolve, reject) =>
          this.context.decodeAudioData(audioBuffer, resolve, reject)
        )
      })
      .then((decodedAudioData: AudioBuffer) => {
        this.buffer = decodedAudioData
        this.state = TRACK_STATE.READY

        this.createSource();

        return this;
      })
      .catch((error) => {
        this.state = TRACK_STATE.FAILED

        console.log('[ERROR LOADING TRACK]', error, `URL: ${url}`)

        return this
      })
  }

  createSource() {
    this.source = this.context.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.bus)

    // Get back loop when created again
    if (this.isLooped) {
      this.looped = true
    }
  }

  removeSource() {
    if (this.source) {
      this.source.disconnect()
      this.hasBeenPlayed && this.source.stop(0)
      this.source = null
    }
  }

  play(offset = 0) {
    this.hasBeenPlayed = true
    if (!this.playing) {
      !this.source && this.createSource();

      const startValue = (this.pausedAt + offset) > 0 ? (this.pausedAt + offset) : 0

      this.source.start(0, startValue)

      this.startedAt = this.context.currentTime - startValue
      this.pausedAt = 0
      this.playing = true
    }
  }

  pause() {
    if (this.playing) {
      const elapsed = this.context.currentTime - this.startedAt
      this.removeSource()
      this.playing = false
      this.pausedAt = elapsed
    }
  }

  fastForward(value = 15) {
    this.pause();
    this.play(value);
  }

  stop() {
    this.removeSource()
    this.pausedAt = 0
    this.startedAt = 0
    this.playing = false
  }

  mute() {
    this.previousVolume = this.volume
    this.volume = 0
    this.muted = true
  }

  unmute() {
    this.muted = false
    this.volume = this.previousVolume
  }

  toggleMute() {
    this.muted ? this.unmute() : this.mute()
  }

  solo() {
    this.soloed = true
    setNodeParamNormalizedValue(this.soloBus.gain, 100)
  }

  unsolo() {
    this.soloed = false
    setNodeParamNormalizedValue(this.soloBus.gain, 0)
  }

  resetSolo() {
    setNodeParamNormalizedValue(this.soloBus.gain, 100)
  }

  toggleSolo() {
    this.soloed ? this.unsolo() : this.solo()
  }

  addFx(effects) {
    return effects.map((fx) => {
      const { id, signalIn } = fx
      const bus = createGainNode(this.context, 0)

      if (this.fx[id]) {
        return false
      }

      connectNodes(this.bus, bus)
      connectNodes(bus, signalIn)

      this.fx[id] = bus

      return bus
    })
  }

  removeFx(id) {
    this.fx[id].disconnect()
  }

  toggleFX() {
    const keys = Object.keys(this.fx)

    this.bypassFX
      ? keys.map(
          (fxId) => (this.fx[fxId].gain.value = this.fx[fxId].previousVolume)
        )
      : keys.map((fxId) => {
          this.fx[fxId].previousVolume = this.fx[fxId].gain.value
          this.fx[fxId].gain.value = 0
        })

    this.bypassFX = !this.bypassFX

    return this.bypassFX
  }
}

export default Track
