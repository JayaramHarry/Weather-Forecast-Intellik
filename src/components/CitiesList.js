import React, { useState, useEffect } from 'react';
import { fetchCities } from '../services/citiesService';
import { fetchWeatherData } from '../services/weatherService'; // Import weather service
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './CitiesList.css';

const CitiesList = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({}); // To store weather data for cities
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true);
      try {
        const data = await fetchCities(query, start);
        setCities(prev => [...prev, ...data]);
        const selectOptions = data.map(city => ({ label: city.name, value: city }));
        setOptions(selectOptions);  // react-select options
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    loadCities();
  }, [query, start]);

  // Fetch weather data for cities and store it
  useEffect(() => {
    cities.forEach(async city => {
      if (city.coordinates && !weatherData[city.geoname_id]) {
        const [lat, lon] = city.coordinates;
        const data = await fetchWeatherData(lat, lon);
        setWeatherData(prev => ({ ...prev, [city.geoname_id]: data }));
      }
    });
  }, [cities]);

  const handleSearchChange = selectedOption => {
    setQuery(selectedOption.label);  
    setStart(0);
    setCities([]);
  };

  const handleCityClick = (city) => {
    if (city && city.coordinates) {
      const [lat, lon] = city.coordinates;
      const cityName = city.name;
      navigate(`/weather/${cityName}/${lat}/${lon}`);
    } else {
      console.error('City object is not defined or does not have coordinates.');
    }
  };

  const handleSort = (column) => {
    const sortedCities = [...cities].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setCities(sortedCities);
  };

  // Open weather page in new tab on right-click
  const handleRightClick = (e, city) => {
    e.preventDefault(); 
    if (city && city.coordinates) {
      const [lat, lon] = city.coordinates;
      const cityName = city.name;
      window.open(`/weather/${cityName}/${lat}/${lon}`, '_blank');
    }
  };

  return (
    <div className="cities-list">
      <Select
        value={options.find(option => option.label === query)}
        onChange={handleSearchChange}
        options={options}
        placeholder="Search cities..."
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City</th>
            <th onClick={() => handleSort('cou_name_en')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
            <th>Weather (High/Low)</th> {/* New column for weather */}
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.geoname_id} 
                onClick={() => handleCityClick(city)} 
                onContextMenu={(e) => handleRightClick(e, city)}>
              <td>{city.name}</td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
              <td>
                {weatherData[city.geoname_id] ? (
                  <>
                    {weatherData[city.geoname_id].main.temp_max}°C /
                    {weatherData[city.geoname_id].main.temp_min}°C
                  </>
                ) : (
                  'Loading...'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default CitiesList;
