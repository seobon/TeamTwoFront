import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useGeoLocation';

const Location = () => {
  const { location, error } = useCurrentLocation();
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getAddressFromCoordinates = async () => {
      try {
        if (location) {
          const { latitude, longitude } = location;
          const locationApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
          const locationResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${locationApiKey}`,
          );

          console.log('locationResponse.result: ', locationResponse);
          const address = locationResponse.data.results[0].formatted_address;
          setAddress(address);
        }
      } catch (error) {
        console.error('Error fetching address: ', error);
      }
    };

    getAddressFromCoordinates();
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {location ? (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
          <br />
          Address: {address || 'Loading...'}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Location;
