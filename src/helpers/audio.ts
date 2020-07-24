'use strict';

import {keys} from 'ramda';

import {
    CONTEXT_STATE,
} from '../constants';

export const createContext = () => new AudioContext();

// TODO
export const createMasterBus = (context: AudioContext, connections: any[] = []): GainNode => {
    const gain = context.createGain();

    gain.connect(context.destination);
    connections.map(connection => gain.connect(connection));

    return gain;
};

export const createAnalyser = (context: AudioContext, parameters = {fftSize: 2048}): AnalyserNode => {
    const analyser = context.createAnalyser();

    keys(parameters).map(key => analyser[key] = parameters[key]);

    return analyser;
};

export const createPanner = (context: AudioContext) => context.createStereoPanner();

export const isAudioParam = (node, parameter) => node[parameter] instanceof AudioParam;

export const fetchAudioAsArrayBuffer = (url): Promise<ArrayBuffer> => fetch(url).then(response => response.arrayBuffer());

export const isContextRunning = context => context.state === CONTEXT_STATE.RUNNING;

/**
 * @returns {Promise}
 */
export const resumeContext = context => context.resume();

