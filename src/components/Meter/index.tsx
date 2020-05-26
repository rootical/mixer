import React, {useRef, useEffect} from 'react';

import {getAverage, createMeterGradient} from './helpers';

import style from './style.module.css';

interface MeterProps {
  // Todo what is it?
  analyser: any;
  width?: number;
  height?: number;
}

const Meter: React.FC<MeterProps> = ({
    analyser = null,
    width = 210,
    height = 20,
}) => {
    if (!analyser) {
        return null;
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const context = canvasRef.current && canvasRef.current.getContext('2d');
        const array = new Uint8Array(analyser.frequencyBinCount);

        const drawMeter = () => {
            analyser.getByteFrequencyData(array);

            const average = getAverage(array);

            if (context) {
              context.clearRect(0, 0, width, height);
              context.fillStyle = createMeterGradient(context, {width, height});
              context.fillRect(0, 0, (width / 100) * average, height);
            }
            requestAnimationFrame(drawMeter);
        }

        drawMeter();
    }, []);

    return (
        <div className={style.meter}>
            <canvas className={style.meterValue} width={width} height={height} ref={canvasRef}></canvas>
        </div>
    );
}

export default Meter;
