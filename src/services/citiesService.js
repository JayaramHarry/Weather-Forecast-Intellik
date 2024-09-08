import axios from "axios";

export const fetchCities = async (query, start) => {
  try {
    const response = await axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
      params: {
        dataset: 'geonames-all-cities-with-a-population-1000',
        rows: 1000, // fetching 20 rows at a time for infinite scroll
        start, // start index for pagination
        q: query, // search query for filtering cities
        sort: 'name'
      }
    });

    // Ensure the correct part of the response is returned
    return response.data.records.map(record => record.fields);
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
