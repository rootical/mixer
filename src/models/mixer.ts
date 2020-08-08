import {
  createContext,
  createAnalyser,
  createMasterBus,
  isContextRunning,
  resumeContext
} from '../helpers/audio'
import { setNodeParams, setNodeParamNormalizedValue, getNodeParamNormalizedValue } from '../helpers/node'
import { playAll, pauseAll, rewindAll, stopAll } from '../helpers/playback'
import Track from './track'

export class Mixer {
  context: AudioContext
  analyser: AnalyserNode
  tracks: any[]
  // TODO: rename fx to sends?
  fx: any[]
  masterBus: GainNode

  constructor(sources = [], effects = []) {
    if (typeof window !== 'undefined') {
      this.context = createContext()

      this.analyser = createAnalyser(this.context)
      this.masterBus = createMasterBus(this.context, [this.analyser])

      this.fx = effects.map(
        (Effect) => new Effect(this.context, this.masterBus)
      )

      this.load(sources)
    }
  }

  get volume() {
    return getNodeParamNormalizedValue(this.masterBus.gain);
  }

  set volume(value) {
    setNodeParamNormalizedValue(this.masterBus.gain, value);
  }

  async fastForward(value = 15) {
    return this.tracks.map((track: Track) => {
      track.fastForward(value);

      return track;
    });
  }

  async fastRewind(value = 15) {
    return this.fastForward(-value);
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async play() {
    const { context } = this

    if (isContextRunning(context) === false) {
      await resumeContext(context)
    }

    playAll(this.tracks)

    return this
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async pause() {
    pauseAll(this.tracks)

    return this
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async rewind() {
    rewindAll(this.tracks)

    return this
  }

  /**
   * @returns {Promise<Mixer>}
   */
  async stop() {
    stopAll(this.tracks)

    return this
  }

  /**
   * @param {TrackId} trackId
   * @param {number} volume
   * @returns {Promise<Track[]>}
   */
  async setTrackVolume(trackId, volume) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.volume = volume
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @param {number} volume
   * @returns {Promise<Track[]>}
   */
  async setTrackPan(trackId, pan) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.pan = pan
      }

      return track
    })
  }
  /**
   *
   * @param {TrackId} trackId
   * @param {SendId} sendId
   * @param {number} level
   * @returns {Promise<Track[]>}
   */
  async setTrackSendLevel(trackId, sendId, level) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        setNodeParamNormalizedValue(track.fx[sendId].gain, level)
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @param {number} value
   * @returns {Promise<Track[]>}
   */
  async setTrackPanLevel(trackId, value) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.pan = value
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @returns {Promise<Track[]>}
   */
  async soloTrack(trackId) {
    const newTracks = this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.toggleSolo()
      } else {
        if (!track.soloed) {
          track.unsolo()
        }
      }
      return track
    })

    if (newTracks.every((track: Track) => !track.soloed)) {
      newTracks.forEach((track: Track) => track.resetSolo())
    }

    return newTracks
  }

  /**
   * @param {TrackId} trackId
   * @returns {Promise<Track[]>}
   */
  async toggleTrack(trackId) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.toggleMute()
      }

      return track
    })
  }

  /**
   * @param {TrackId} trackId
   * @returns {Promise<Track[]>}
   */
  async toggleTrackFx(trackId) {
    return this.tracks.map((track: Track) => {
      if (track.id === trackId) {
        track.toggleFX()
      }

      return track
    })
  }

  /**
   *
   * @param {SendId} sendId
   * @param {number|string} value
   * @retruns {Promise<Send[]>}
   */
  async setSendParamValue(sendId, parameterId, value) {
    return this.fx.map((fx) => {
      if (fx.id === sendId) {
        setNodeParams(fx, { [parameterId]: value })
      }

      return fx
    })
  }

  async loop(value) {
    return this.tracks.map((track: Track) => {
      track.looped = value
      return track
    })
  }

  load(sources) {
    this.tracks = sources.map(
      ({ url, title }) =>
        new Track({
          url,
          title,
          context: this.context,
          masterBus: this.masterBus,
          sends: this.fx
        })
    )

    return Promise.all(this.tracks.map((track: Track) => track.loadingState))
  }
}
