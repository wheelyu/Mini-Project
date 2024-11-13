// src/inputField/SelectForm.jsx
import React, { useState } from 'react';
import { getDataIndeks } from '../services/indeksAPI';

const SelectForm = () => {
  const [dataIndeks, setDataIndeks] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [formState, setFormState] = useState({
    selectedDate: '',
    selectedHour: '',
  });
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState('');

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setError(null);
          fetchLocationName(latitude, longitude);
        },
        () => setError('Unable to retrieve your location')
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setLocationName(data.address.city || data.address.village || data.address.town || 'Unknown Location');
    } catch {
      setLocationName('Unable to determine location name');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!latitude || !longitude) {
      setError('Location is required');
      return;
    }
    console.log(latitude, longitude);
    setIsLoader(true);
    setDataIndeks(null);
    setForecastData(null);
    setError(null);

    try {
      const result = await getDataIndeks(latitude, longitude);
      setDataIndeks(result);

      const selectedDate = formState.selectedDate;
      const selectedHour = parseInt(formState.selectedHour, 10);

      const forecast = result.forecast.find((item) => {
        const forecastDate = new Date(item.time);
        const forecastDateString = forecastDate.toISOString().split('T')[0];
        const forecastHour = (forecastDate.getUTCHours() + 7) % 24; // Convert to WIB

        return forecastDateString === selectedDate && forecastHour === selectedHour;
      });

      if (forecast) {
        setForecastData(forecast);
      } else {
        setError('Forecast data not found for selected date and time.');
      }

      setIsLoader(false);
    } catch {
      setError('Failed to fetch indeks data');
    }
  };

  const formatWIBTime = (utcTime) => {
    const localTime = new Date(utcTime);
    localTime.setHours(localTime.getUTCHours() + 7);
    return localTime.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4 px-20">Cek UV Index </h2>

        <button
          type="button"
          onClick={getLocation}
          className="mb-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Current Location
        </button>

        {locationName && (
          <p className="text-gray-700 font-medium mb-4">Current Location: {locationName}</p>
        )}

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Pilih Tanggal</label>
          <input
            type="date"
            id="date"
            name="selectedDate"
            value={formState.selectedDate}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hour" className="block text-gray-700 font-medium mb-2">Pilih Waktu</label>
          <select
            id="hour"
            name="selectedHour"
            value={formState.selectedHour}
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Pilih jam</option>
            {[...Array(24)].map((_, index) => (
              <option key={index} value={index}>{index}:00</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Submit
        </button>
      </form>

      <div className="p-4">
        <h2 className="text-xl font-bold">Data INDEKS UV</h2>
        {isLoader ? <div className="loader mx-auto"></div> : 
        (dataIndeks?.now ? (
          <ul className="list-disc">
            <li><strong>Current Time:</strong> {formatWIBTime(dataIndeks.now.time)}</li>
            <li><strong>Current UVI:</strong> {dataIndeks.now.uvi}</li>
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada data terkini</p>
        ))}
        
        <h2 className="text-xl font-bold mt-4">Forecast Data</h2>
        {forecastData ? (
          <ul className="list-disc">
            <li><strong>Forecast Time:</strong> {formatWIBTime(forecastData.time)}</li>
            <li><strong>Forecast UVI:</strong> {forecastData.uvi}</li>
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada Data Ramalan</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SelectForm;
