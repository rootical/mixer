import 'react-mixdesk/dist/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Mixdesk } from 'react-mixdesk'

import './index.css'

const defaultTracks = [
  // {
  //   title: 'Click',
  //   url:
  //     'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/128/original/HW_1-CLICK.m4a?1597937753'
  // },
  {
    title: 'Guide',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/130/original/HW_2-GUIDE.m4a?1597937753'
  },
  {
    title: 'Drums',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/129/original/HW_3-DRUMS.m4a?1597937753'
  }
]

const loading = (loadingState) => {
  console.log('Loading State', loadingState)
}

ReactDOM.render(
  <Mixdesk
    tracks={defaultTracks}
    effects={[]}
    hasMasterTrack={false}
    onLoading={loading}
  >
    <button>3RD PARTY</button>
  </Mixdesk>,
  document.getElementById('root')
)
