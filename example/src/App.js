import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, createState, mixdeskInstance, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
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
    const [state, dispatch] = useReducer(reducer, createState(mixdesk));
    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        mixdeskInstance.load(tracks).then(trackStates => {
            const {tracks} = state;
            setReadyStateOnLoad((...args) => {
                dispatchWithLog(...args);
                dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
                eventListener(...args);
            }, mixdeskInstance);
        });
    }, [tracks]);

    return (
        <Context.Provider value={dispatchWithLog}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};

export default App;
