
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CitiesList from './components/CitiesList';
import WeatherPage from './components/WeatherPage';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitiesList />} />
        {/* Ensure the route is correctly set up to pass cityName, lat, and lon */}
        <Route path="/weather/:cityName/:lat/:lon" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
