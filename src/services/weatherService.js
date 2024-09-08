// import axios from 'axios';

// const WEATHER_API_KEY = '536ae6ee5c400b6633bcbd7ebd41e188';
// const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// export const fetchWeatherData = async (lat, lon) => {
//     const response = await axios.get(WEATHER_API_URL, {
//         params: {
//             lat,
//             lon,
//             appid: WEATHER_API_KEY,
//             units: 'metric'
//         }
//     });
//     return response.data;
// };

const API_KEY = '536ae6ee5c400b6633bcbd7ebd41e188'; // Make sure your API key is correct
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    
    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather data', error);
    throw error; // Rethrow the error so it can be caught in the calling function
  }
};
