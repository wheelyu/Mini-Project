// src/inputField/SelectForm.jsx
import React, { useEffect, useState } from 'react';
import { getData } from '../services/RegionAPI';

const SelectForm = () => {
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const result = await getData();
            setData(result);
        } catch (err) {
            setError('Failed to fetch data');
        }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedData = data.find((item) => item.id === selectedOption);
        console.log('Data sesuai ID yang dipilih:', selectedData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-md mx-auto">
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
            {data.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option> 
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
    );
    };

export default SelectForm;
