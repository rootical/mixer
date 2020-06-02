import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, createInitialState, createMixdesk, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
import 'react-mixdesk/dist/index.css'

const App = () => {
    const [state, dispatch] = useReducer(reducer, createInitialState());
    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        setReadyStateOnLoad(dispatchWithLog, createMixdesk());
    }, []);

    return (
        <Context.Provider value={dispatchWithLog}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};

export default App;
