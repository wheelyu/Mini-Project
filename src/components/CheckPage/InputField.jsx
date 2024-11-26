// components/SelectForm.jsx
import React, { useState, useEffect } from 'react';
import { getLocation, fetchLocationName } from '../../services/LocationServices';
import {getDataIndeks} from '../../services/indeksAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../store/useUVStore';
import './inputField.css';

const SelectForm = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [formState, setFormState] = useState({
    selectedDate: '',
    selectedHour: '',
  });

  
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
        const { latitude, longitude } = position.coords; // Dapatkan koordinat latitude dan longitude
        setLatitude(latitude);
        setLongitude(longitude);
        try {
          const name = await fetchLocationName(latitude, longitude); // Dapatkan nama lokasi
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

    setLoading(true); // Menandakan bahwa proses pengambilan data sedang berjalan

    try {
      // Mendapatkan data indeks UV berdasarkan latitude dan longitude
      const result = await getDataIndeks(latitude, longitude);
      
      // Mengambil tanggal dan jam yang dipilih pengguna dari formState
      const selectedDate = formState.selectedDate; 
      const selectedHour = parseInt(formState.selectedHour, 10); 

      // Menyaring semua data ramalan pada tanggal tertentu
      const allForecastData = result.forecast.filter((item) => {
        const forecastDate = new Date(item.time);
        const forecastDateString = forecastDate.toISOString().split('T')[0];
        return forecastDateString === selectedDate; 
      });

      // Mencari data ramalan (forecast) yang sesuai dengan tanggal dan jam yang dipilih
      const forecast = allForecastData.find((item) => {
        const forecastDate = new Date(item.time);
        const forecastHour = (forecastDate.getUTCHours() + 7) % 24; 
        return forecastHour === selectedHour; 
      });

      // Jika tidak ada data ramalan yang sesuai, lempar error
      if (!forecast) {
        throw new Error('No forecast data available for selected time');
      }

      // Menyimpan data UV saat ini, ramalan yang dipilih, dan semua data ramalan pada tanggal tertentu ke dalam state
      setUVData({
        now: result.now, 
        forecast: forecast,  
        allForecastData: allForecastData 
      });

      setError(null); 
    } catch (error) {
      // Menangkap error dan menyimpan pesan error ke dalam state
      setError(error.message || 'Failed to fetch UV index data');
    } finally {
      // Menandakan bahwa proses pengambilan data selesai
      setLoading(false);
    }

  };

  // Mengambil tanggal hari ini untuk min date
  const today = new Date().toISOString().split('T')[0];
  
  // Mengambil tanggal selanjutnya untuk max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 4);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="w-full md:w-1/2 pt-20">
      <form onSubmit={handleSubmit} className="p-4 md:p-20 bg-white  dark:bg-green-800  dark:bg-opacity-10 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-white">
          Cek UV Index di lokasi kamu!
        </h2>

        <button
          type="button"
          onClick={handleGetLocation}
          className="Btn mb-6 mx-auto flex items-center justify-center bg-green-900 dark:bg-[#588157] hover:bg-[#588157] dark:hover:bg-green-700"
        >
          <div className="sign">
            <FontAwesomeIcon icon={faMapLocationDot} className="text-lg " />
          </div>
          <div className="text">Check</div>
        </button>
      <div className='min-h-20'>
        {locationName ? (
          <div className="mb-6 p-4 bg-green-50 rounded-lg" >
            <p className="text-green-700 font-medium">
              📍 {locationName}
            </p>
          </div>
        ) : 
        
        (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg" >
            <p className="text-yellow-600 font-medium">
              📍 Klik tombol diatas
            </p>
          </div>
        )}
        
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg" >
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
                    focus:border-transparent "
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
                    focus:border-transparent 
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
          className="w-full bg-green-900 dark:bg-[#588157] hover:bg-green-800 dark:hover:bg-green-700 text-white font-semibold py-3 px-6 
                  rounded-lg  focus:outline-none 
                  focus:ring-2  focus:ring-offset-2 
                  "
        >
          Check UV Index
        </button>
      </form>
    </div>
  );
};

export default SelectForm;