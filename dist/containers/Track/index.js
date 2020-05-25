import React, { useContext } from 'react';
import Track from './../../components/Track';
import Context from './../Context';
import { setTrackVolume, setTrackSendLevel, toggleTrack, toggleTrackFx, } from './../../store/actions';
const TrackContainer = props => {
    const { id: trackId } = props;
    const dispatch = useContext(Context);
    return (React.createElement(Track, Object.assign({}, props, { onMute: toggleTrack(dispatch), onBypass: toggleTrackFx(dispatch), onVolumeChange: setTrackVolume(dispatch, trackId), onSendLevelChange: setTrackSendLevel(dispatch, trackId) })));
};
export default TrackContainer;
//# sourceMappingURL=index.js.map