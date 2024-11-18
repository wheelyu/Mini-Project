// components/SelectForm.jsx
import React, { useState, useEffect } from 'react';
import { getLocation, fetchLocationName } from '../../services/LocationServices';
import {getDataIndeks} from '../../services/indeksAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../store/useUVStore';

import './inputField.css';

const SelectForm = () => {
  const [formState, setFormState] = useState({
    selectedDate: '',
    selectedHour: '',
  });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
  const { 
    uvData: { locationName, error },
    setLocationName, 
    setLoading, 
    setError,
    setUVData 
  } = useStore();



  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {

    getLocation(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        try {
          const name = await fetchLocationName(latitude, longitude);
          setLocationName(name);
          setError(null);
        } catch (error) {
          setError('Unable to determine location name');
        } finally {

        }
      },
      () => {
        setError('Unable to retrieve your location');

      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!latitude || !longitude) {
      setError('Please get your location first');
      return;
    }

    setLoading(true);
    try {
      const result = await getDataIndeks(latitude, longitude);
      
      const selectedDate = formState.selectedDate;
      const selectedHour = parseInt(formState.selectedHour, 10);

      const forecast = result.forecast.find((item) => {
        const forecastDate = new Date(item.time);
        const forecastDateString = forecastDate.toISOString().split('T')[0];
        const forecastHour = (forecastDate.getUTCHours() + 7) % 24;

        return forecastDateString === selectedDate && forecastHour === selectedHour;
      });

      if (!forecast) {
        throw new Error('No forecast data available for selected time');
      }

      setUVData({
        now: result.now,
        forecast: forecast
      });
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to fetch UV index data');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 7 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 4);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="w-full md:w-1/2 pt-20" data-aos="fade-right">
      <form onSubmit={handleSubmit} className="p-20 bg-[#4a6e5c] dark:bg-[#344E41] rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Cek UV Index di lokasi kamu!
        </h2>

        <button
          type="button"
          onClick={handleGetLocation}
          className="Btn mb-6 mx-auto flex items-center justify-center bg-[#A3B18A] dark:bg-[#588157] hover:bg-[#588157] dark:hover:bg-[#A3B18A] "
        >
          <div className="sign">
            <FontAwesomeIcon icon={faMapLocationDot} className="text-lg " />
          </div>
          <div className="text">Check</div>
        </button>
      <div className='min-h-20'>
        {locationName && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg" data-aos="fade-right">
            <p className="text-green-700 font-medium">
              📍 {locationName}
            </p>
          </div>
        )
        
        }

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg" data-aos="fade-right">
            <p className="text-red-600">
              ⚠️ {error}
            </p>
          </div>
        )}
        </div>
        <div className="mb-6">
          <label 
            htmlFor="date" 
            className="block text-white font-medium mb-2"
          >
            Pilih Tanggal
          </label>
          <input
            type="date"
            id="date"
            name="selectedDate"
            value={formState.selectedDate}
            onChange={handleInputChange}
            min={today}
            max={maxDateString}
            className="block w-full p-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-yellow-500 
                     focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="mb-8">
          <label 
            htmlFor="hour" 
            className="block text-white font-medium mb-2"
          >
            Pilih Waktu
          </label>
          <select
            id="hour"
            name="selectedHour"
            value={formState.selectedHour}
            onChange={handleInputChange}
            className="block w-full p-3 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-yellow-500
                     focus:border-transparent transition-all duration-200
                     appearance-none bg-white"
            required
          >
            <option value="" disabled>Choose hour</option>
            {[...Array(24)].map((_, index) => (
              <option key={index} value={index}>
                {index.toString().padStart(2, '0')}:00
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#A3B18A] dark:bg-[#588157] hover:bg-[#588157] dark:hover:bg-[#A3B18A] text-black font-semibold py-3 px-6 
                   rounded-lg  focus:outline-none 
                   focus:ring-2  focus:ring-offset-2 
                   transition-all duration-200 transform hover:scale-[1.02]"
        >
          Check UV Index
        </button>
      </form>
    </div>
  );
};

export default SelectForm;