import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  // Save the Location information
  const [location, setLocation] = useState();
  // Error msg 저장
  const [error, setError] = useState();

  // GeoLocation의 getCurrentPosition method에 대한 성공 callback handler
  const handleSuccess = pos => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // GeoLocation의 getCurrentPosition method에 대한 실패 callback handler
  const handleError = error => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = window.navigator;

    // Used Browser에서 GeoLocation이 정의되지 않은 경우 오류로 처리
    if (!geolocation) {
      setError("Geolocation isn't supported.");
      return;
    }

    // Call GeoLocation API
    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};

export default useCurrentLocation;
