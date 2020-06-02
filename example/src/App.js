import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, createState, mixdesk, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
import 'react-mixdesk/dist/index.css'

const defaultTracks = [
    {
        title : 'Drums',
        url : 'mixer/assets/audio/drums.mp3'
    },
    {
        title : 'Bass',
        url : 'mixer/assets/audio/bass.mp3'
    },
    {
        title : 'Keys',
        url : 'mixer/assets/audio/riddim.mp3'
    },
    {
        title : 'Melodies',
        url : 'mixer/assets/audio/vox.mp3'
    }
];

const App = ({
  tracks = defaultTracks,
  eventListener = (...args) => {},
}) => {
    const [state, dispatch] = useReducer(reducer, createState(mixdesk));
    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        mixdesk.load(tracks).then(trackStates => {
            const {tracks} = createState(mixdesk);

            setReadyStateOnLoad((...args) => {
                dispatchWithLog(...args);
                dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
                eventListener(...args);
            }, mixdesk);
        });
    }, [tracks]);

    return (
        <Context.Provider value={dispatchWithLog}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};

export default App;
