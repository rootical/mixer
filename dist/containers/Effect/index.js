import React, { useContext } from 'react';
import Effect from './../../components/Effect';
import Context from './../Context';
import { setSendParamValue, } from './../../store/actions';
const EffectContainer = props => {
    const dispatch = useContext(Context);
    return (React.createElement(Effect, Object.assign({}, props, { onParamChange: setSendParamValue(dispatch, props.id) })));
};
export default EffectContainer;
//# sourceMappingURL=index.js.map