import 'react-mixdesk/dist/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Mixdesk } from 'react-mixdesk'

import './index.css'

const defaultTracks = [
  {
    title: 'Click',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/045/original/CLICK.m4a?1596649329'
  },
  {
    title: 'Guide',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/046/original/GUIDE.m4a?1596649329'
  },
  {
    title: 'Drums',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/047/original/DRUMS.m4a?1596649329'
  }
]

ReactDOM.render(
  <Mixdesk tracks={defaultTracks} effects={[]} hasMasterTrack={false}><button>3RD PARTY</button></Mixdesk>,
  document.getElementById('root')
)
