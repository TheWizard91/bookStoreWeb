"use client"

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState();

  useEffect(() => {
    function handleResize() {
      window.navigator.geolocation.getCurrentPosition(
        (newPos) => setPosition(newPos),
        console.error
      );
      setWindowDimensions(getWindowDimensions());
      console.log("w: "+windowDimensions)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
