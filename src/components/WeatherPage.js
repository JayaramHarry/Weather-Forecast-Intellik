// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';  // Import useParams hook
// import { fetchWeatherData } from '../services/weatherService';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import L from 'leaflet'; // Import Leaflet to customize icons
// import 'leaflet/dist/leaflet.css';
// import './WeatherPage.css';

// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// // Weather-specific images (URLs to publicly available images)
// const weatherImages = {
//   Clear: 'https://images.unsplash.com/photo-1515982758024-347b7a9a781f',
//   Rain: 'https://images.unsplash.com/photo-1498491864314-ef23545730f3',
//   Clouds: 'https://images.unsplash.com/photo-1506748686214e9df14f1d0d',
//   Snow: 'https://images.unsplash.com/photo-1543812550-0f6a00d0b7d7',
//   Default: 'https://images.unsplash.com/photo-1496587121243-4b02b5a67f96',
// };


// // Create a custom icon
// const customMarkerIcon = new L.Icon({
//   iconUrl: markerIconPng,
//   shadowUrl: markerShadowPng,
//   iconSize: [25, 41], // size of the icon
//   iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
//   popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
//   shadowSize: [41, 41], // size of the shadow
// });

// const WeatherPage = () => {
//   const { cityName, lat, lon } = useParams();  // Destructure params using useParams hook
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isCelsius, setIsCelsius] = useState(true);
//   const [backgroundImage, setBackgroundImage] = useState(weatherImages.Default);

//   useEffect(() => {
//     const loadWeather = async () => {
//       try {
//         const data = await fetchWeatherData(lat, lon);
//         setWeather(data);

//         // Set background image based on weather condition
//         const condition = data.weather[0].main;
//         setBackgroundImage(weatherImages[condition] || weatherImages.Default);
//       } catch (error) {
//         console.error(error);
//       }
//       setLoading(false);
//     };

//     loadWeather();
//   }, [lat, lon]);

//   const toggleUnit = () => setIsCelsius(prev => !prev);

//   const temperature = isCelsius ? weather?.main.temp : (weather?.main.temp * 9/5) + 32;
//   const unit = isCelsius ? '°C' : '°F';

//   if (loading) return <div className="loading">Loading weather data...</div>;
//   if (!weather) return <div className="error">Failed to load weather data. Please try again later.</div>;

//   return (
//     <div className="weather-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <h1>Weather in {cityName}</h1>
//       <div className="weather-info">
//         <img src={weatherImages[weather.weather[0].main] || weatherImages.Default} alt={weather.weather[0].main} className="weather-icon" />
//         <p>Temperature: {temperature}{unit}</p>
//         <p>Weather: {weather.weather[0].description}</p>
//         <p>Humidity: {weather.main.humidity}%</p>
//         <p>Wind Speed: {weather.wind.speed} m/s</p>
//         <p>Pressure: {weather.main.pressure} hPa</p>
//         <button onClick={toggleUnit}>
//           Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
//         </button>
//       </div>
//       <div className="map-container">
//         <MapContainer center={[lat, lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={[lat, lon]} icon={customMarkerIcon} />
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams hook
import { fetchWeatherData } from '../services/weatherService';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet to customize icons
import 'leaflet/dist/leaflet.css';
import './WeatherPage.css';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Local image paths for weather conditions
const weatherIcons = {
  Clear: '/images/sunny-bg.png',
  Rain: '/images/rainy-bg.png',
  Clouds: '/images/cloudy-bg.png',
  Snow: '/images/snowy-bg.png',
  Default: '/images/default-bg.png',
};

// Create a custom icon
const customMarkerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

const WeatherPage = () => {
  const { cityName, lat, lon } = useParams();  // Destructure params using useParams hook
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState(weatherIcons.Default);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeatherData(lat, lon);
        setWeather(data);

        // Set icon path based on weather condition
        const condition = data.weather[0].main;
        setWeatherIcon(weatherIcons[condition] || weatherIcons.Default);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    loadWeather();
  }, [lat, lon]);

  const toggleUnit = () => setIsCelsius(prev => !prev);

  const temperature = isCelsius ? weather?.main.temp : (weather?.main.temp * 9/5) + 32;
  const unit = isCelsius ? '°C' : '°F';

  if (loading) return <div className="loading">Loading weather data...</div>;
  if (!weather) return <div className="error">Failed to load weather data. Please try again later.</div>;

  return (
    <div className="weather-page">
      <h1>Weather in {cityName}</h1>
      <div className="weather-info">
        <img
          src={weatherIcon} 
          alt={weather.weather[0].main} 
          className="weather-icon" 
        />
        <p>Temperature: {temperature}{unit}</p>
        <p>Weather: {weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Pressure: {weather.main.pressure} hPa</p>
        <button className="button" onClick={toggleUnit}>
          {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
      <div className="map-container">
        <MapContainer center={[lat, lon]} zoom={13} style={{ height: "630px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lon]} icon={customMarkerIcon} />
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherPage;
