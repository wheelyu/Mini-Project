import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { formatWIBTime } from '../../hooks/useFormatTime';
import useStore from '../../store/useUVStore';

export default function UVIndexChart() {
    const { allForecastData, isLoading } = useStore((state) => state.uvData);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Filter out data with UVI = 0
    const filteredForecastData = allForecastData.filter(item => item.uvi > 0);

    if (!filteredForecastData || filteredForecastData.length === 0) {
        return <div className="bg-white dark:bg-[#121212] dark:text-[#344E41] text-[#2b4237] ">No UV index data Selected</div>;
    }
    const getFormattedDate = () => {
        if (allForecastData && allForecastData.length > 0) {
            const firstDataItem = allForecastData[0];
            const date = new Date(firstDataItem.time);
            
            // Format date in Indonesian style
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        return 'Tanggal Tidak Tersedia';
    };
    // Function to determine color based on UVI level
    const getUVIColor = (uvi) => {
        if (uvi <= 2) return 'rgba(76, 175, 80, 0.6)';  // Green - Low
        if (uvi <= 5) return 'rgba(255, 235, 59, 0.6)';  // Yellow - Moderate
        if (uvi <= 7) return 'rgba(255, 152, 0, 0.6)';  // Orange - High
        if (uvi <= 10) return 'rgba(244, 67, 54, 0.6)';  // Red - Very High
        return 'rgba(156, 39, 176, 0.6)';  // Purple - Extreme
    };

    const chartData = {
        labels: filteredForecastData.map(item => {
            const formattedTime = formatWIBTime(item.time);
            return formattedTime.split(' ').pop().split('.')[0];
        }),
        datasets: [
            {
                label: 'UV Index',
                data: filteredForecastData.map(item => item.uvi),
                backgroundColor: filteredForecastData.map(item => getUVIColor(item.uvi)),
                borderColor: filteredForecastData.map(item => getUVIColor(item.uvi).replace('0.6)', '1)')),
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'UV Index'
                }
            }
        }
    };
    const highestUVIData = filteredForecastData.reduce((max, item) => 
        item.uvi > max.uvi ? item : max
    );
    const getUVIRisk = (uvi) => {
            if (uvi <= 2) return 'Rendah';
            if (uvi <= 5) return 'Sedang';
            if (uvi <= 7) return 'Tinggi';
            if (uvi <= 10) return 'Sangat Tinggi';
            return 'Ekstrem';
        };
    return (
        <div className="flex flex-col  justify-center items-start px-5 md:px-48 py-20 bg-[efefef] dark:bg-[#121212]  ">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white py-10">Grafik UV Index tanggal {getFormattedDate()}</h1>
            <div className="w-full h-96">
                <Bar data={chartData} options={chartOptions} />
                
            </div>
            <div className="p-4 w-full bg-gray-100 dark:bg-opacity-5 rounded">
                <h3 className="font-bold mb-2 text-black dark:text-white">Ringkasan UV Index</h3>
                <p className="text-black dark:text-white">
                    UV Index tertinggi tercatat pada pukul {formatWIBTime(highestUVIData.time).split(' ').pop().split('.')[0]} 
                    &nbsp;dengan nilai {highestUVIData.uvi}, yang tergolong ke dalam kategori {getUVIRisk(highestUVIData.uvi)}.
                    </p>
                    <p className="text-black dark:text-white">
                    Sepanjang hari, terdapat {filteredForecastData.length} periode dengan paparan sinar UV, 
                    dengan rentang risiko UV Index mulai dari kategori {getUVIRisk(Math.min(...filteredForecastData.map(item => item.uvi)))} 
                    &nbsp;hingga {getUVIRisk(Math.max(...filteredForecastData.map(item => item.uvi)))}.
                    </p>
            </div>
        </div>
    );
}