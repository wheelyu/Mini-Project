import React, { useEffect, useState } from 'react';
import { formatWIBTime } from '../hooks/FormatTime';
import useStore from '../store/useUVStore';
import { getResponse } from './GeminiAI';
const ForecastDisplay = () => {
    const { forecastData, isLoading } = useStore((state) => state.uvData);
    const [aiResponse, setAIResponse] = useState(""); // State to store AI response

    useEffect(() => {
      const generateResponse = async () => {
        setAIResponse('');
        if (forecastData) {
         
          const Data = 'Ramalan UVI: ' + forecastData.uvi + ' Ramalan pada tanggal dan waktu:' + formatWIBTime(forecastData.time);
          console.log(Data);
          try {
            const response = await getResponse(Data);
            setAIResponse(response); // Set the AI response in the state
            console.log("AI Response:", response);
          } catch (error) {
            console.error("Error generating AI response:", error);
          }
        }
      };
      
      generateResponse();
    }, [forecastData]);
      
    return (
        <div className="min-h-56 max-h-fit md:max-h-56 dark:text-white" data-aos="fade-left">
        <h2 className="text-xl font-bold mt-4">Ramalan UV</h2>
        {isLoading ? (
            <div className="loader mx-auto mt-12"></div>
        ) :
        (forecastData ? (
            <div className="flex flex-row justify-between">
            <div className=" w-3/4" data-aos="fade-up">
                <ul className="list-disc pl-4">
                <li><strong>Forecast Time:</strong> {formatWIBTime(forecastData.time)}</li>
                <li><strong>Forecast UVI:</strong> {forecastData.uvi}</li>
                </ul>
                <p className="text-xl w-full">
                {aiResponse || "Memuat respons AI..."} {/* Display AI response or loading text */}
                </p>
            </div>
            <div className="w-1/4" data-aos="fade-left">
                <img src={forecastData.uvi <= 2 ? 'sun1.png' : 
                forecastData.uvi <= 5 ?'sun2.png':
                forecastData.uvi <= 7 ?'sun3.png':
                forecastData.uvi <= 10 ?'sun4.png':'sun5.png'} alt="UV Index" className="mx-auto mt-4 w-40" />
            </div>
            </div>
        ) : (
            <p className="text-gray-500">Tidak ada Data Ramalan</p>
        ))}
    </div>
  );
};

export default ForecastDisplay;