import 'react-mixdesk/dist/index.css'

import React, { useState } from 'react'
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
const newTracks = [
  {
    title: 'Guide',
    url:
      'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/132/original/GUIDE.m4a?1598286874'
  }
]

const loading = (loadingState) => {
  console.log('Loading State', loadingState)
}

const Component = () => {
  const [tracks, setTracks] = useState(defaultTracks)

  return (
    <Mixdesk
      tracks={tracks}
      effects={[]}
      hasMasterTrack={false}
      onLoading={loading}
    >
      <button
        onClick={() => {
          setTracks(newTracks)
        }}
      >
        3RD PARTY
      </button>
    </Mixdesk>
  )
}

ReactDOM.render(
  <div className='example-container'>
    <Component />
  </div>,
  document.getElementById('root')
)
