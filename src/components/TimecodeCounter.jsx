import React, { useState, useEffect } from 'react';

export const TimecodeCounter = ({ fps = 24, className = "" }) => {
  const [time, setTime] = useState({
    hours: 1,
    minutes: 14,
    seconds: 28,
    frames: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let f = prev.frames + 1;
        let s = prev.seconds;
        let m = prev.minutes;
        let h = prev.hours;

        if (f >= fps) {
          f = 0;
          s += 1;
        }
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h = (h + 1) % 24;
        }

        return { hours: h, minutes: m, seconds: s, frames: f };
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [fps]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <span className={`font-mono tracking-widest ${className}`}>
      {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}:{pad(time.frames)}
    </span>
  );
};
