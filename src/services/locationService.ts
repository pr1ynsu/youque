export const startTracking = (callback: any) => {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      callback({
        lat: latitude,
        lng: longitude,
      });
    },
    (error) => console.error(error),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
};