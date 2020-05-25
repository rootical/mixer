import React, { useRef, useEffect } from 'react';
import { getAverage, createMeterGradient } from './helpers';
import style from './style.css';
const Meter = ({ analyser = null, width = 210, height = 20, }) => {
    if (!analyser) {
        return null;
    }
    const canvasRef = useRef(null);
    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        const array = new Uint8Array(analyser.frequencyBinCount);
        const drawMeter = () => {
            analyser.getByteFrequencyData(array);
            const average = getAverage(array);
            context.clearRect(0, 0, width, height);
            context.fillStyle = createMeterGradient(context, { width, height });
            context.fillRect(0, 0, (width / 100) * average, height);
            requestAnimationFrame(drawMeter);
        };
        drawMeter();
    }, []);
    return (React.createElement("div", { className: style.meter },
        React.createElement("canvas", { className: style.meterValue, width: width, height: height, ref: canvasRef })));
};
export default Meter;
//# sourceMappingURL=index.js.map