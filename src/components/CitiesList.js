import React, { useState, useEffect } from 'react';
import { fetchCities } from '../services/citiesService';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './CitiesList.css';

const CitiesList = () => {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate(); // Use the navigate hook

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

  const handleSearchChange = selectedOption => {
    setQuery(selectedOption.label);  // Set query from selection
    setStart(0);
    setCities([]);
  };

  const handleCityClick = (city) => {
    console.log(city); // Log the city object to verify its structure
  
    if (city && city.coordinates) {
      const [lat, lon] = city.coordinates; // Extract lat and lon from the coordinates array
      const cityName = city.name; // Or city.label_en, based on your requirement
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
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.geoname_id} onClick={() => handleCityClick(city)}>
              <td>{city.name}</td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default CitiesList;
