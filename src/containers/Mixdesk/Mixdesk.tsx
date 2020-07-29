import React from 'react';

import {useMixer} from '../../hooks/useMixer';
import {DeskContainer} from '../Desk';
import {Context} from '../Context'


export const Mixdesk = ({tracks = []}) => {
    const context = useMixer(tracks);
    const {mx, state, dispatch} = context;

    return (
        <Context.Provider value={{mx, dispatch}}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};