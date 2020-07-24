import {useMixer} from './hooks/useMixer';
import Desk from './containers/Desk';
import Context from './containers/Context'

const Mixer = ({
  tracks = defaultTracks,
}) => {
    const context = useMixer(tracks);
    const {mx, state, dispatch} = context;

    return (
        <Context.Provider value={{mx, dispatch}}>
            <Desk {...state} />
        </Context.Provider>
    );
};

export default Mixer;