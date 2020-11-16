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
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/132/original/GUIDE.m4a?1598286874'
  },
  {
    title: 'Drums',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/133/original/DRUMS.m4a?1598286874'
  }
]

const loading = (loadingState) => {
  console.log('Loading State', loadingState)
}

ReactDOM.render(
  <div className='example-container'>
    <Mixdesk
      tracks={defaultTracks}
      effects={[]}
      hasMasterTrack={false}
      onLoading={loading}
    >
      <button>3RD PARTY</button>
    </Mixdesk>
  </div>,
  document.getElementById('root')
)
