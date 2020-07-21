import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, createState, mixdesk, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
import 'react-mixdesk/dist/index.css'

const defaultTracks = [
    {
        title : 'Click',
        url : 'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/009/original/CLICK.m4a?1594846181'
    },
    {
        title : 'Guide',
        url : 'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/021/original/GUIDE.m4a?1594846181'
    },
    {
        title : 'Drums',
        url : 'https://s3.amazonaws.com/worship-online/song_audio_mixer_tracks/audios/000/000/033/original/DRUMS.m4a?1594846181'
    },
    {
        title : 'Melodies',
        url : 'assets/vox.mp3'
    }
];

const App = ({
  tracks = defaultTracks,
  eventListener = (...args) => {},
}) => {
    const [state, dispatch] = useReducer(reducer, createState(mixdesk))
    const dispatchWithLog = getDispatchWithLog(dispatch)

    useEffect(() => {
      mixdesk.load(tracks).then((trackStates) => {
        setReadyStateOnLoad((...args) => {
          dispatchWithLog(...args)
          dispatchWithLog({ type: 'SET_TRACKS', payload: trackStates })
          eventListener(...args)
        }, mixdesk)
      })
    // eslint-disable-next-line
    }, [tracks])

    return (
        <Context.Provider value={dispatchWithLog}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};

export default App;
