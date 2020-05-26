import React, {useReducer, useEffect} from 'react';

import {DeskContainer, Context, initialState, mixdesk, reducer, setReadyStateOnLoad, getDispatchWithLog} from 'react-mixdesk';
// import {Context} from 'react-mixdesk/containers/Context';

// import {initialState} from 'react-mixdesk/store';
// import {mixdesk} from 'react-mixdesk/store/mixdesk';
// import {reducer} from 'react-mixdesk/store/reducers';
// import {
//     setReadyStateOnLoad,
//     getDispatchWithLog,
// } from 'react-mixdesk/store/helpers';


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
