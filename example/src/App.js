import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, initialState, mixdesk, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
import 'react-mixdesk/dist/index.css'

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        setReadyStateOnLoad(dispatchWithLog, mixdesk);
    }, []);

    return (
        <Context.Provider value={dispatchWithLog}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};

export default App;
