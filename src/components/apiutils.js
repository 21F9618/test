import axios from "axios";

const BASE_URL = "https://maps.gomaps.pro/maps/api";

const API_KEY = "AlzaSycxnGQ4K4aaOSQNVly04YVWl3EwpLSUG5C";

// Distance Matrix API
export const fetchDistanceMatrix = async (origins, destinations) => {
  try {
    const response = await axios.get(`${BASE_URL}/distancematrix/json`, {
      params: {
        origins,
        destinations,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Distance Matrix data:", error);
    return null;
  }
};

// Directions API
export const fetchDirections = async (origin, destination) => {
  try {
    const response = await axios.get(`${BASE_URL}/directions/json`, {
      params: {
        origin,
        destination,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Directions data:", error);
    return null;
  }
};

// Geocoding API
export const fetchGeocodedAddress = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}/geocode/json`, {
      params: {
        latlng: `${latitude},${longitude}`,
        key: API_KEY,
      },
    });
    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      return response.data.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    console.error("Error fetching geocoded address:", error);
    return null;
  }
};
