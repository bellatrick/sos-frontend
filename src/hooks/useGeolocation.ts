import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<{ latitude?: number; longitude?: number }>({});
  const [error, setError] = useState<string>("");

  const initGeolocation = (): Geolocation | undefined => {
    if ((window as any)?.cordova) {
      if (window.navigator.geolocation) {
        return window.navigator.geolocation;
      } else {
        setError("cordova-plugin-geolocation is not installed.");
        return undefined;
      }
    }

    if (window.navigator.geolocation) {
      return window.navigator.geolocation;
    } else {
      setError("Geolocation is not supported by this browser.");
      return undefined;
    }
  };

  const getCurrentLocation = (): void => {
    const geolocation = initGeolocation();

    if (geolocation) {
      geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error: GeolocationPositionError) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, error, getCurrentLocation };
};

export default useGeolocation;
