// src/inputField/SelectForm.jsx
import React, { useEffect, useState } from 'react';
import { getDataRegion } from '../services/RegionAPI';
import { getDataIndeks } from '../services/indeksAPI';

const SelectForm = () => {
  const [dataRegion, setDataRegion] = useState([]);
  const [dataIndeks, setDataIndeks] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataRegion();
        setDataRegion(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setDataIndeks(null);
    setForecastData(null);
    setTime(null);
    setError(null);

    const selectedData = dataRegion.find((item) => item.id === selectedOption);

    if (selectedData) {
      const { latitude, longitude } = selectedData;
      try {
        const result = await getDataIndeks(latitude, longitude);
        setDataIndeks(result);

        // Format waktu "now" ke WIB
        const utcDate = new Date(result.now.time);
        const wibDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

        const wibTimeString = wibDate.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        setTime(wibTimeString);

        // Cari data forecast berdasarkan tanggal dan jam yang dipilih
        const forecast = result.forecast.find((item) => {
          const forecastDate = new Date(item.time);
          const forecastDateString = forecastDate.toISOString().split('T')[0]; // Format tanggal
          const forecastHour = forecastDate.getUTCHours() + 7; // Jam dalam WIB

          return (
            forecastDateString === selectedDate &&
            forecastHour === parseInt(selectedHour, 10)
          );
        });

        if (forecast) {
          setForecastData(forecast);
        } else {
          setForecastData(null);
          setError('Forecast data not found for selected date and time.');
        }

      } catch (err) {
        setError('Failed to fetch data');
      }
    } else {
      setError('Invalid selection');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-w-96'>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md ">
        <h2 className="text-2xl font-semibold mb-4">Select an Option</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label htmlFor="options" className="block text-gray-700 font-medium mb-2">Options</label>
          <select
            id="options"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select an option</option>
            {dataRegion.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option> 
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Select Date</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hour" className="block text-gray-700 font-medium mb-2">Select Hour</label>
          <select
            id="hour"
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select hour</option>
            {[...Array(24)].map((_, index) => (
              <option key={index} value={index}>{index}:00</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      <div className="p-4">
        <h2 className="text-xl font-bold">Data INDEKS UV</h2>
        {dataIndeks && dataIndeks.now ? (
          <ul className="list-disc pl-5">
            <li><strong>Current Time:</strong> {time}</li>
            <li><strong>Current UVI:</strong> {dataIndeks.now.uvi}</li>
          </ul>
        ) : (
          <p className="text-gray-500">No current data available. Please submit a selection.</p>
        )}

        <h2 className="text-xl font-bold mt-4">Forecast Data</h2>
        {forecastData ? (
          <ul className="list-disc pl-5">
            <li><strong>Forecast Time:</strong> {new Date(forecastData.time).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</li>
            <li><strong>Forecast UVI:</strong> {forecastData.uvi}</li>
          </ul>
        ) : (
          <p className="text-gray-500">No forecast data available for selected date and time.</p>
        )}
      </div>
    </div>
  );
};

export default SelectForm;
