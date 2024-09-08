
### Weather App

## Overview

The Weather App provides real-time weather information for cities around the world. Users can select a city from a dropdown menu, view weather details, and see the location on a map. The application is built using React for the frontend and integrates with a weather API to fetch weather data.

## Features

- **City Search**: Search for cities using a dropdown menu.
- **Weather Details**: View current weather conditions including temperature, description, humidity, wind speed, and pressure.
- **Weather Icons**: Display weather conditions with appropriate icons.
- **Map Integration**: View the location of the selected city on an interactive map.
- **Responsive Design**: The app is responsive and works on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, React Router, React-Leaflet
- **Backend**: Weather API (for fetching weather data)
- **Styling**: CSS for styling and responsiveness
- **Libraries**: react-select, Leaflet

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your machine.
- A valid API key for the weather API.

### Getting Started

1. **Clone the Repository**

   git clone https://github.com/JayaramHarry/Weather-Forecast-Intellik.git
   cd intellik_weather_assignment
   
   

2. **Install Dependencies**

   npm install
   

3. **Setup Environment Variables**

   Create a `.env` file in the root of the project and add your API key:

   env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   

4. **Run the Application**

   npm start
   

   This will start the development server and you can view the application at `http://localhost:3000`.

## Components

### `CitiesList`

- Displays a searchable dropdown to select cities.
- Loads cities dynamically based on user input.
- Navigates to the weather details page for the selected city.

### `WeatherPage`

- Shows weather details for a selected city.
- Displays an image representing the current weather condition.
- Shows the location of the city on a map.

## CSS Styling

- **`.cities-list`**: Styles for the city search and list table.
- **`.weather-page`**: Styles for the weather details page, including background images and map container.
- **`.weather-info`**: Styles for weather information display.
- **`.map-container`**: Ensures the map takes up 100% width and adjusts to screen size.

## API Integration

The application uses the Weather API to fetch weather data. Ensure that your API key is valid and correctly configured in the `.env` file.

**Example API Request:**

const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${lat},${lon}`);
  const data = await response.json();
  return data;
};


