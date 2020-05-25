import React, { useReducer, useEffect } from 'react';
import { render } from 'react-dom';
import Desk from './containers/Desk';
import Context from './containers/Context';
import { initialState } from './store';
import { mixdesk } from './store/mixdesk';
import { reducer } from './store/reducers';
import { setReadyStateOnLoad, getDispatchWithLog, } from './store/helpers';
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchWithLog = getDispatchWithLog(dispatch);
    useEffect(() => {
        setReadyStateOnLoad(dispatchWithLog, mixdesk);
    }, []);
    return (React.createElement(Context.Provider, { value: dispatchWithLog },
        React.createElement(Desk, Object.assign({}, state))));
};
render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map