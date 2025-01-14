import React, { useEffect, useState } from 'react';
import { formatWIBTime } from '../../hooks/useFormatTime';
import useStore from '../../store/useUVStore';
const ForecastDisplay = () => {
    const { forecastData, isLoading, } = useStore((state) => state.uvData);
    
      
    return (
        <div className=" dark:text-white min-h-[540px]" >
        <h2 className="text-xl font-bold mt-4 text-center w-full">Forecast Result</h2>
        {isLoading ? (
            <div className="loader mx-auto mt-12"></div>
        ) :
        (forecastData ? (
            <div className="flex flex-row justify-between">
            <div className=" w-full" >
                <div className="list-disc pl-4 flex flex-row justify-between">
                <p><strong>Forecast Time:</strong> {formatWIBTime(forecastData.time)}</p>
                <p><strong>Forecast UVI:</strong> {forecastData.uvi}</p>
                </div>
                <p className="text-xl w-full my-10 text-center">
                  As of <strong>{formatWIBTime(forecastData.time)}</strong>, the UV index is <strong style={{ color: forecastData.uvi <= 2 ? 'green' : forecastData.uvi <= 5 ? 'yellow' : forecastData.uvi <= 7 ? 'orange' : forecastData.uvi <= 10 ? 'red' : 'purple' }}>{forecastData.uvi}</strong>. 
                  This means {forecastData.uvi <= 2
                  ? 'you can enjoy the sun with minimal protection. However, sunscreen is always a good idea.'
                  : forecastData.uvi <= 5
                  ? 'the suns rays are strong. Protect yourself with sunscreen, a hat, and sunglasses, especially if youll be outdoors for a long time.'
                  : forecastData.uvi <= 7
                  ? 'the sun is intense. Sunburn is likely if you dont protect your skin. Use sunscreen, wear a hat and sunglasses, and seek shade.'
                  : forecastData.uvi <= 10
                  ? 'the sun is very strong. Skin damage is likely. Stay in the shade as much as possible between 10 am and 4 pm. Wear protective clothing and sunscreen.'
                  : 'the sun is extremely strong. Sunburn will occur very quickly. Stay indoors and avoid all sun exposure.'}
                </p>

            </div>
            </div>
        ) : (
            <p className="text-gray-500">No forecast data available</p>
        ))}
    </div>
  );
};

export default ForecastDisplay;