import React, { useState } from 'react';

export const FilmGrain = () => {
  const [hasGrain, setHasGrain] = useState(true);

  return (
    <>
      {hasGrain && (
        <div 
          className="film-grain"
          aria-hidden="true"
        />
      )}
      <div 
        className="fixed inset-0 pointer-events-none z-50 bg-radial-vignette opacity-70"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(0,0,0,0.85) 100%)'
        }}
        aria-hidden="true"
      />
    </>
  );
};
