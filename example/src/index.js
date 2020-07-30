import 'react-mixdesk/dist/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Mixdesk } from 'react-mixdesk'

import './index.css'

const defaultTracks = [
  {
    title: 'Click',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/009/original/CLICK.m4a?1594846181'
  },
  {
    title: 'Guide',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/021/original/GUIDE.m4a?1594846181'
  },
  {
    title: 'Drums',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/033/original/DRUMS.m4a?1594846181'
  }
]

ReactDOM.render(
  <Mixdesk tracks={defaultTracks} />,
  document.getElementById('root')
)
