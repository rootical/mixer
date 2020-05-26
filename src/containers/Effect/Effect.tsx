import React, {useContext} from 'react';

import Effect from '../../components/Effect';
import {Context} from '../Context/Context';

import {
    setSendParamValue,
} from '../../store/actions';


export const EffectContainer = props => {
    const dispatch = useContext(Context);

    return (
        <Effect
            {...props}
            onParamChange={setSendParamValue(dispatch, props.id)}
        />
    );
};

