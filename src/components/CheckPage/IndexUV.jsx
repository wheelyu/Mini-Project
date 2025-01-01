import React, { useEffect, useState } from 'react';
import { formatWIBTime } from '../../hooks/useFormatTime';
import useStore from '../../store/useUVStore';

const UVIndexDisplay = () => {
  const { currentData, locationName, isLoading } = useStore((state) => state.uvData);

  return (
    <div className="min-h-56 max-h-fit md:max-h-56 dark:text-white">
      <h2 className="text-xl font-bold">Indeks UV hari ini</h2>
      {isLoading ? (
        <div className="loader mx-auto mt-12"></div>
      ) : (
        currentData ? (
          <div className="flex flex-row justify-between">
            <div className="w-3/4" >
              <ul className="list-disc pl-4">
                <li><strong>Location:</strong> {locationName}</li>
                <li><strong>Current Time:</strong> {formatWIBTime(currentData.time)}</li>
                <li><strong>Current UVI:</strong> {currentData.uvi}</li>
              </ul>
              <p className="text-xl w-full">
                Berdasarkan data hari ini, 
                tingkat indeks UV adalah {currentData.uvi}, 
                yang berarti kondisi ini tergolong{' '}
                {currentData.uvi <= 2
                  ? 'rendah dan relatif aman bagi kulit. Anda tidak memerlukan perlindungan tambahan, tetapi tetap disarankan untuk menggunakan tabir surya.'
                  : currentData.uvi <= 5
                  ? 'sedang. Disarankan untuk memakai tabir surya dan mengenakan pelindung seperti topi jika Anda akan berada di luar untuk waktu yang lama.'
                  : currentData.uvi <= 7
                  ? 'tinggi. Paparan UV yang berkepanjangan dapat merusak kulit. Gunakan tabir surya, kacamata hitam, dan tetap di tempat teduh jika memungkinkan.'
                  : currentData.uvi <= 10
                  ? 'sangat tinggi. Risiko kerusakan kulit meningkat secara signifikan. Hindari paparan matahari langsung selama siang hari, gunakan pelindung penuh.'
                  : 'ekstrem. Paparan sinar UV sangat berbahaya. Tetap di dalam ruangan sebanyak mungkin, dan hindari semua paparan matahari.'}
              </p>

            </div>
            <div className="w-1/4" >
              <img src={currentData.uvi <= 2 ? 'sun1.png' : 
                currentData.uvi <= 5 ?'sun2.png':
                currentData.uvi <= 7 ?'sun3.png':
                currentData.uvi <= 10 ?'sun4.png':'sun5.png'} alt="UV Index" className="mx-auto mt-4 w-40" />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada data terkini</p>
        )
      )}
    </div>
  );
};

export default UVIndexDisplay;
