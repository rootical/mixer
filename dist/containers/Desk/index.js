import React, { useContext } from 'react';
import Desk from './../../components/Desk';
import Effect from './../Effect';
import Context from './../Context';
import Track from './../Track';
import { play, pause, rewind, } from './../../store/actions';
const DeskContainer = ({ tracks, effects, playback, }) => {
    const dispatch = useContext(Context);
    const Tracks = tracks.map(track => (React.createElement(Track, Object.assign({}, track, { key: track.id }))));
    const Effects = effects.map(effect => (React.createElement(Effect, Object.assign({}, effect, { key: effect.id }))));
    return (React.createElement(Desk, { onPlay: () => play(dispatch), onPause: () => pause(dispatch), onRewind: () => rewind(dispatch), tracks: Tracks, effects: Effects, playback: playback }));
};
export default DeskContainer;
//# sourceMappingURL=index.js.map