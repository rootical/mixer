import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, createState, mixdesk, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
import 'react-mixdesk/dist/index.css'

const defaultTracks = [
    {
        title : 'Drums',
        url : 'assets/drums.mp3'
    },
    {
        title : 'Bass',
        url : 'assets/bass.mp3'
    },
    {
        title : 'Keys',
        url : 'assets/riddim.mp3'
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
