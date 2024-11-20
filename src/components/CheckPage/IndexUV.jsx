import React, { useEffect, useState } from 'react';
import { formatWIBTime } from '../../hooks/useFormatTime';
import useStore from '../../store/useUVStore';
import { getResponse } from './GeminiAI';

const UVIndexDisplay = () => {
  const { currentData, locationName, isLoading } = useStore((state) => state.uvData);
  const [aiResponse, setAIResponse] = useState(""); // State to store AI response

  useEffect(() => {
    const generateResponse = async () => {
        setAIResponse('');
      if (currentData) {
        const Data = 'uvi saat ini ' + currentData.uvi + 'pada tanggal dan waktu:' + formatWIBTime(currentData.time);
        console.log(Data);
        try {
          const response = await getResponse(Data);
          setAIResponse(response); 
          console.log("AI Response:", response);
        } catch (error) {
          console.error("Error generating AI response:", error);
        }
      }
    };
    generateResponse();
  }, [currentData]); // Menjalankan effect setiap kali currentData berubah

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
                {aiResponse || "Memuat respons AI..."} {/* Display AI response or loading text */}
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
